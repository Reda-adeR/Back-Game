from channels.generic.websocket import AsyncWebsocketConsumer

from collections import defaultdict

#import the model games
#this for probably syncronizing server with database
from channels.db import database_sync_to_async

import json

import random, time
from .consu_helper import *

#read me :
# I will need to create a list of all the communication strings for parsing
# 

def switchturnUpdtboardAddmoves(p1,p2,idx,is_x_turn):
    if( idx > 8 or idx < 0 ):
        return 1
    if is_x_turn:
        p1.board[idx // 3][idx%3] = X_CHAR
        p2.board[idx // 3][idx%3] = X_CHAR
    else:
        p1.board[idx // 3][idx%3] = O_CHAR
        p2.board[idx // 3][idx%3] = O_CHAR
    p1.board = p1.board
    p2.board = p2.board
    # print("p1Board: ", p1.board)
    p1.turn, p2.turn = (T_OFF, T_ON) if is_x_turn else (T_ON, T_OFF)
    p1.moves  += 1 if is_x_turn else 0
    p2.moves += 0 if is_x_turn else 1
    return 0




class test(AsyncWebsocketConsumer):
    async def setupPlayersAndInit(self, grp, game_type):
        print("found TWO clients the game will INIT NOW : ")
            # self.fc = 
            # self.sc = 
        player1 = player(grp.popleft())
        player2 = player(grp.popleft())
        gen_game_id = f"{player1.channel_name}_{player2.channel_name}_{int(time.time())}"

        player1.game_id = player2.game_id = gen_game_id
        player1.first_to = player2.first_to = game_type
        player_game_map[player1.channel_name] = player_game_map[player2.channel_name]= gen_game_id

        game_box[gen_game_id] = [player1, player2]
        # game_box[player2.channel_name] = players

        # here must get the data of each player to send it
        await self.initGame([player1, player2], True)
        
    async def drawAnnounce(self, pf, ps):
        pf.gameResult["msg"] = ps.gameResult["msg"] = "Match Draw !"
        await self.channel_layer.send(pf.channel_name, pf.gameResult)
        await self.channel_layer.send(ps.channel_name, ps.gameResult)
        # pf.is_inGame = ps.is_inGame = False
        await self.initGame([pf, ps], False)

    async def checkWin(self, pf, ps):
        bts = ''.join([char if char else ' ' for row in pf.board for char in row])
        print("board to string : |", bts,"|")
        for c in win_combo:
            if bts[c[0]] == bts[c[1]] == bts[c[2]] and bts[c[0]] != " ":
                pf.wins = pf.wins + 1 if bts[c[0]] == pf.char else pf.wins + 0
                ps.wins = ps.wins + 1 if bts[c[0]] == ps.char else ps.wins + 0
                # print("pf wins : ", pf.wins)
                # print("ps wins : ", ps.wins)
                if (pf.wins == pf.first_to or ps.wins == ps.first_to):
                    pf.res = "You won the game !" if bts[c[0]] == pf.char else "You lost the game !"
                    ps.res = "You won the game !" if bts[c[0]] == ps.char else "You lost the game !"
                else:
                    # game didnt end but must inform who won who didnt before init
                    pf.partyResult["msg"] = True if bts[c[0]] == pf.char else False
                    ps.partyResult["msg"] = True if bts[c[0]] == ps.char else False
                    await self.channel_layer.send(pf.channel_name, pf.partyResult)
                    await self.channel_layer.send(ps.channel_name, ps.partyResult)
                    await self.initGame([pf, ps], False)
                    return 1
                # here its the end of game and final result is sent 
                pf.gameResult["opwins"] = ps.wins
                ps.gameResult["opwins"] = pf.wins
                ps.gameResult["nbGames"] = pf.gameResult["nbGames"] = pf.nbGames
                await self.channel_layer.send(pf.channel_name, pf.gameResult)
                await self.channel_layer.send(ps.channel_name, ps.gameResult)
                pf.is_inGame = ps.is_inGame= False
                ps.nbGames = pf.nbGames = 0
                return 1
        return 0
            
    async def informPlayAgain(self, toBeInformedObj):
        await self.channel_layer.send(toBeInformedObj.channel_name, toBeInformedObj.playAgainMsg)
        # {
        #     "type"  : "inform",
        #     "msg"   : "Let's Play again !"
        # }
    async def initGame(self,players, rand):
        print("In game INIT. . .")
        # if typeInit:
        #     players[0].char, players[1].char = ('o','x') if random.choice([True,False]) else ('x','o')
        # else:
        # from .models import games
        # self.gamedb = games()
        # self.gamedb.fp_id = players[0].channel_name
        # self.gamedb.sp_id = players[1].channel_name
        # self.gamedb.first_to = 1
        # self.gamedb.num_of_games += 1
        # players[0].moves = 0
        # players[0].moves = 0
        players[0].nbGames += 1
        players[1].nbGames += 1
        print("nbGames : ", players[0].nbGames)
        players[0].board = [["","",""], ["","",""], ["","",""]]
        players[1].board = [["","",""], ["","",""], ["","",""]]
        players[0].again = A_OFF
        players[1].again = A_OFF
        if rand:
            players[0].char, players[1].char = (O_CHAR,X_CHAR) if random.choice([True,False]) else (X_CHAR,O_CHAR) 
            players[0].turn, players[1].turn = (T_OFF,T_ON) if random.choice([True,False]) else (T_ON, T_OFF)
        else:
            # players[0].char, players[1].char = (O_CHAR,X_CHAR) if players[0].char == X_CHAR else (X_CHAR,O_CHAR)
            players[0].turn, players[1].turn = (T_OFF,T_ON) if players[1].turn else (T_ON, T_OFF)
        players[0].setup["opwins"] = players[1].wins
        players[1].setup["opwins"] = players[0].wins

        # players[0].is_in_game, players[1].is_in_game = True 
        # players[0].is_waiting, players[1].is_waiting = True 

        #here before sending i must complete the rest of data 
        # await database_sync_to_async(self.gamedb.save)()
        # print("p1  :",players[0].setup["wins"])
        # print("p2  :",players[1].setup["wins"])
        await self.channel_layer.send(players[0].channel_name, players[0].setup)
        await self.channel_layer.send(players[1].channel_name, players[1].setup)
        players[0].is_inGame = True
        players[1].is_inGame = True

    async def playAgain(self):
        # print("PLAY AGAIN")
        guId = player_game_map.get(self.channel_name, None)
        if guId == None:
            return
        players = game_box.get(guId, None)
        if players == None:
            return
        
        if ( players[0].channel_name == self.channel_name ):
            players[0].again = A_ON
            await self.informPlayAgain(players[1])
        else:
            players[1].again = A_ON
            await self.informPlayAgain(players[0])
        if (players[0].again == A_ON and players[1].again == A_ON):
            players[0].wins = 0
            players[1].wins = 0
            await self.initGame(players, False)
        # check if both players are in play again mode
            
    async def quitGame(self):
        print("QUIT GAME")
        await self.close(code=1000)
        # players = game_box.get(self.channel_name)
        # if ( players[0].channel_name == self.channel_name ):

    async def connect(self):
        # Here i must check for the user himself is he auth-
        # get his data needed for the game (name lvl img)
        # know what type he want to play first to 1 3 5 7
        await self.accept()
        # await self.receive_json()
    async def distribute(self,content):
        print("gg")
        game_type = content.get('first_to', None)
    
    # Extract the game type
        # game_type = game_type_message.get('first_to', None)

        if game_type is None:
            await self.close(code=4001)  # Invalid or missing game type
            return
        
        game_type = int(game_type)
        if (game_type == 1):
            grp_m.append(self.channel_name)
            if len(grp_m) >= 2:
                await self.setupPlayersAndInit(grp_m, game_type)
                return
        elif (game_type == 3):
            grp_m3.append(self.channel_name)
            if len(grp_m3) >= 2:
                await self.setupPlayersAndInit(grp_m3, game_type)
                return
        elif (game_type == 5):
            grp_m5.append(self.channel_name)
            if len(grp_m5) >= 2:
                await self.setupPlayersAndInit(grp_m5, game_type)
                return
        elif (game_type == 7):
            grp_m7.append(self.channel_name)
            if len(grp_m7) >= 2:
                await self.setupPlayersAndInit(grp_m7, game_type)
                return
        else:
            await self.close(code=4002)
            return
        # print("A NEW CLient has been added to ----> ", self.channel_name)

        
        await self.channel_layer.send(self.channel_name, {
            "type": "waiting",
            "message": "en couuuurs. ."
        })
        print("WAITING FOR A SECOND CLIENT ")
    
    async def disconnect(self, code):
        if self.channel_name in grp_m:
            grp_m.remove(self.channel_name)
        elif self.channel_name in grp_m3:
            grp_m3.remove(self.channel_name)
        elif self.channel_name in grp_m5:
            grp_m5.remove(self.channel_name)
        elif self.channel_name in grp_m7:
            grp_m7.remove(self.channel_name)
            # grp_m.remove(self.channel_name)
        if self.channel_name in game_box:
            game_box.pop(self.channel_name)
            print("IS FREED FROM GAME_BOX")

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=message)

    #win and loose msgs
    async def windrawloose(self, event):
        await self.send(text_data=json.dumps({
            "type": event["type"],
            "msg" : event["msg"],
            "wins": event["wins"],
            "nbGames": event["nbGames"],
            "opwins": event["opwins"],
            "board": event.get("board")
        }))
    async def inform(self, event):
        await self.send(text_data=json.dumps({
            "type": event["type"],
            "msg" : event["msg"]
        }))
    
    async def partyResult(self, event):
        await self.send(text_data=json.dumps({
            "type": event["type"],
            "player": event["player"],
            "msg" : event["msg"]
        }))
    async def setup(self, event):
        # Handle setup messages to send to the WebSocket client
        await self.send(text_data=json.dumps({
            "type": "setup",
            "player": event['player'],
            "turn": event['turn'],
            "wins": event['wins'],
            "opwins": event['opwins'],
            "message": event['message'],
            "board" : event['board'],
            "him": event.get('him'),
            "me": event.get('me')
        }))
    
    async def waiting(self, event):
        # Handle waiting messages to send to the WebSocket client
        await self.send(text_data=json.dumps({
            "type": "waiting",
            "message": event['message']
        }))

    async def in_game(self, event):
        await self.send(text_data=json.dumps({
            "type": "in_game",
            "turn": event.get("turn"),
            "valid": "y",
            "moves":event.get("moves"),
            # "played_now": event.get("played_now"),
            "board": event.get("board")
        }))
    
    async def resetMoves(self, players):
        players[0].moves = 0
        players[1].moves = 0

    async def receive(self, text_data):
        # data must be parsed here 
        # and then create the players
        txt_json = json.loads(text_data)
        msg_type = txt_json.get("type", None)
        if msg_type == None:
            return
        #must be handled if is already in game or is not in game 
        if msg_type == 'first_to':
            await self.distribute(txt_json)
        guId = player_game_map.get(self.channel_name, None)
        if guId == None:
            return
        players = game_box.get(guId, None)
        if players == None:
            print("players not found")
            return
        #prevent the other player from playing
        # if (players[0].turn and players[0].channel_name != self.channel_name) or \
        # (players[1].turn and players[1].channel_name != self.channel_name):
        #     print("BOOOM")
        #     return
        firstP ,secondP = (players[0], players[1]) if players[0].char == X_CHAR else (players[1], players[0])
        is_x_turn = firstP.turn
        if msg_type == 'playAgain':
            if firstP.is_inGame and secondP.is_inGame:
                print("both are in game")
                return
            await self.playAgain()
        if msg_type == 'quitGame':
            await self.quitGame()
        if msg_type == in_gaming:
            clickIdx = txt_json.get("clickIdx", None)
            if clickIdx == None:
                return
            # here its the board update and switch turn
            if switchturnUpdtboardAddmoves(firstP, secondP, clickIdx, is_x_turn):
                return

            # here its the winner check
            if firstP.moves >= 3 or secondP.moves >= 3:
                if await self.checkWin(firstP, secondP):
                    await self.resetMoves(players)
                    return
            # here its the draw check
            if firstP.moves + secondP.moves == 9:
                await self.drawAnnounce(firstP, secondP)
                await self.resetMoves(players)
                return
    
            await self.channel_layer.send(firstP.channel_name, firstP.inGame)
            await self.channel_layer.send(secondP.channel_name, secondP.inGame)
    








# if hasattr(self, 'gamedb'):
#     print("first gg")
#     print("GG : ", self.gamedb.fp_wins)
    # self.gamedb.fp_wins = firstP.board
    # await database_sync_to_async(self.gamedb.save)()