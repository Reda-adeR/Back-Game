from channels.generic.websocket import AsyncWebsocketConsumer

from collections import defaultdict

from collections import deque

import json

import random, copy

grp_m = deque()
grp_m2 = deque()
grp_m3 = deque()
msgsDic = {
    "setup"         : {
        "type": "setup",
        "player": "x",
        "turn": "on",
        "wins": 0,
        "message": "Nice, you both connected!",
        "him": {
            "fname": "abbass",
            "lname": "lamba",
            "lvl"  : 0,
            "timer": "",
        },
        "me": {
            "fname": "hmida",
            "lname": "lourim",
            "lvl"  : 0,
            "timer": "",
        }
    },
    "in_game"       : {
        "type"      : "in_game",
        "turn"      : "",
        "valid"     : "y",
        # "moves"     : 0,
        # "played_now": "",
        "board"     : [
            ["","",""],
            ["","",""],
            ["","",""]
        ]
    }
}
# async def boardParse(board, p1, p2):
#     print("hey------")
#     boardToStr = [char for row in board for char in row]
#     p1c = boardToStr.count( p1["played_now"] ) or 0
#     p2c = boardToStr.count( p2["played_now"] ) or 0
#     p3c = boardToStr.count( '0' ) or 0
#     print("num x : ",p1c, "num o : ",p2c, "zeros : ", p3c)
#     if (len(boardToStr) != 9
#         or p1c != p1["moves"]
#         or p2c != p2["moves"]
#         or p3c != 9 - (p1c+p2c)):
#         return 0
#     return 1
# fc = None
# sc = None


class player:
    def __init__(self, name):
        self.channel_name = name
        self.char = ''
        self.turn = 'off'
        self.moves = 0
        self.name = 'reda'
        self.lvl = 0.55
        self.wins = 0
        self.is_in_game = False
        self.is_waiting = False
        self.first_to = 1
    # jpn = False # just played now



game_box = {}
win_combo = [
    [0, 1, 2],  # Row 1
    [3, 4, 5],  # Row 2
    [6, 7, 8],  # Row 3
    [0, 3, 6],  # Column 1
    [1, 4, 7],  # Column 2
    [2, 5, 8],  # Column 3
    [0, 4, 8],  # Diagonal 1
    [2, 4, 6]   # Diagonal 2
]



class test(AsyncWebsocketConsumer):
    async def checkWin(self, board, pf, ps):
        bts = ''.join([char for row in board for char in row])
        for c in win_combo:
            if bts[c[0]] == bts[c[1]] == bts[c[2]] and bts[c[0]] != "0":
                pf.wins += 1 if bts[c[0]] == pf.char else 0
                ps.wins += 1 if bts[c[0]] == ps.char else 0
                fplayer_res = "win" if bts[c[0]] == pf.char else "loose"
                splayer_res = "win" if bts[c[0]] == ps.char else "loose"
                # print("nooo wayyyyyy : ", fplayer_res)                
                await self.channel_layer.send(pf.channel_name, {
                    "type"      : fplayer_res,
                    "msg"       : "You "+fplayer_res+" !",
                    "board"     : board,
                })
                await self.channel_layer.send(ps.channel_name, {
                    "type"      : splayer_res,
                    "msg"       : "You "+splayer_res+" !",      
                    "board"     : board,
                })
                # print("yesss wayyyyyy : ", splayer_res )
                return 1
        return 0
            

    async def initGame(self,players):
        print("In game INIT. . .")

        players[0].char, players[1].char = ('o','x') if random.choice([True,False]) else ('x','o') 
        players[0].turn, players[1].turn = ('off','on') if players[1].char == 'x' else ('on', 'off')
        players[0].is_in_game, players[1].is_in_game = True 
        players[0].is_waiting, players[1].is_waiting = True 

        p1 = copy.deepcopy(msgsDic["setup"])
        p1["player"] = players[0].char
        p1["turn"] = players[0].turn
        p1["me"]["fname"] = "amine"
        p1["him"]["fname"] = "issam"
        p1["me"]["lvl"] = players[0].lvl


        p2 = copy.deepcopy(msgsDic["setup"])
        p2["player"] = players[1].char
        p2["turn"] = players[1].turn
        p2["me"]["fname"] = "issam"
        p2["him"]["fname"] = "amine"
        p2["me"]["lvl"] = players[1].lvl

        #here before sending i must complete the rest of data 

        await self.channel_layer.send(players[0].channel_name, p1)
        await self.channel_layer.send(players[1].channel_name, p2)
    fc = ""
    sc = ""
    async def connect(self):
        await self.accept()
        grp_m.append(self.channel_name)
        print("A NEW CLient has been added to ----> ", self.channel_name)

        if len(grp_m) >= 2:
            print("found TWO clients the game will INIT NOW : ")
            # self.fc = 
            # self.sc = 
            player1 = player(grp_m.popleft())
            player2 = player(grp_m.popleft())
            players = [player1, player2]
            # obj = {
            #     self.fc: players,
            #     self.sc: players
            # }
            game_box[player1.channel_name] = players
            game_box[player2.channel_name] = players

            # here must get the data of each player to send it
            await self.initGame(players)
        else:
            await self.channel_layer.send(self.channel_name, {
                "type": "waiting",
                "message": "en couuuurs. ."
            })
            print("WAITING FOR A SECOND CLIENT ")
    
    async def disconnect(self, code):
        if self.channel_name in grp_m:
            grp_m.remove(self.channel_name)

    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=message)

    #win and loose msgs
    async def win(self, event):
        await self.send(text_data=json.dumps({
            "type": event["type"],
            "msg" : event["msg"],
            "board": event.get("board")
        }))
    async def loose(self, event):
        await self.send(text_data=json.dumps({
            "type": event["type"],
            "msg" : event["msg"],
            "board": event.get("board")
        }))

        
    async def setup(self, event):
        # Handle setup messages to send to the WebSocket client
        await self.send(text_data=json.dumps({
            "type": "setup",
            "player": event['player'],
            "turn": event['turn'],
            "message": event['message'],
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
    
    async def receive(self, text_data):
        txt_json = json.loads(text_data)
        print("before ################")
        msg_type = txt_json['type']
        print("after ################")
        # if msg_type == 'setting_gup':
        #     # create two players objects
        #     # if len(grp_m) >= 2:
        #     if ( len(grp_m2) >= 2 ):
        #         print("here ::: ",len(grp_m2),":::: ", msg_type)
        #         self.fc = grp_m2.popleft()
        #         self.sc = grp_m2.popleft()

        #         p1 = copy.deepcopy(msgsDic["setting_gup"])
        #         p2 = copy.deepcopy(msgsDic["setting_gup"])
        #         # p1 = msgsDic["setting_gup"]
        #         # p2 = msgsDic["setting_gup"]
        #         if ( random.choice([1,2]) == 1 ):
        #             p1["player"] = "x"
        #             p2["player"] = "o"
        #         else:
        #             p1["player"] = "o"
        #             p2["player"] = "x"
        #         await self.channel_layer.send(self.fc, p1)
        #         await self.channel_layer.send(self.sc, p2)
        if msg_type == 'in_game':
            # must parse the board here 
            # then check for a winner or draw
            resp1 = copy.deepcopy(msgsDic["in_game"])
            resp2 = copy.deepcopy(msgsDic["in_game"])

            players = game_box.get(self.channel_name)
            firstP ,secondP = (players[0], players[1]) if players[0].char == 'x' else (players[1], players[0])
            
            # board must be parsed here
            # after parsing the board if any error found must return 
            # an error msg to tell the player to play again 


            is_x_turn = txt_json['player'] == 'x'

            resp1["turn"], resp2["turn"] = ('off', 'on') if is_x_turn else ('on', 'off')
            firstP.moves  += 1 if is_x_turn else 0
            secondP.moves += 0 if is_x_turn else 1

            
            # resp1["played_now"] = txt_json['player']
            # resp2["played_now"] = txt_json['player']
            # await boardParse(txt_json['theBoard'], resp1, resp2)
            # here its the winner check
            resp1["board"] = txt_json['theBoard']
            resp2["board"] = txt_json['theBoard']
            if firstP.moves >= 3 or secondP.moves >= 3:
                if await self.checkWin(txt_json['theBoard'], firstP, secondP):
                    return
                
            # print("yOuuuuuuuuuuuuuuuu1: ", self.fc)
            # print("yOuuuuuuuuuuuuuuuu2: ", self.sc)
            print("lastlyllylylylylylyly")
    
            await self.channel_layer.send(firstP.channel_name, resp1)
            await self.channel_layer.send(secondP.channel_name, resp2)
    