from collections import deque
import copy
game_setup  = "setup"
in_gaming   = "in_game"
game_reslt  = "windrawloose"
wait4Match  = "waiting"
rePlay_req  = "inform"
party_reslt = "partyResult"

T_ON    = True
A_ON    = True
T_OFF   = False
A_OFF   = False

X_CHAR = 'x'
O_CHAR = 'o'

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

# game mode groups
grp_m = deque()
grp_m3 = deque()
grp_m5 = deque()
grp_m7 = deque()

game_box = {}
player_game_map = {} # map the player to the game
# grp_m2 = deque()
# grp_m3 = deque()
msgsDic = {
    game_setup         : {
        "type": "setup",
        "player": "",
        "wins": 0,
        "opwins": 0,
        "turn": T_OFF,
        "message": "Nice, you both connected!",
        "board" : [["","",""], ["","",""], ["","",""]],
        "him": {
            "fname": "abbass",
            "lname": "lamba",
            "lvl"  : 0,
        },
        "me": {
            "fname": "hmida",
            "lname": "lourim",
            "lvl"  : 0,
        }
    },
    in_gaming       : {
        "type"      : "in_game",
        "turn"      : T_OFF,
        "valid"     : "y",
        "wins"     : 0,
        # "played_now": "",
        "board"     : [["","",""], ["","",""], ["","",""]]
    },
    game_reslt  :   {
        "type"      : "windrawloose",
        "msg"       : "",
        "nbGames"   : 0,
        "wins"      : 0,
        "opwins"    : 0,
        "board"     : []
    },
    party_reslt :   {
        "type"      : "partyResult",
        "player"    : "",
        "msg"       : False
    },
    rePlay_req        :   {
        "type"  : "inform",
        "msg"   : "Let's Play again !"
    }
    ,
    wait4Match       :   {
        "type": "waiting",
        "message": "en couuuurs. ."
    }
}

class player:
    def __init__(self, name):
        self.channel_name = name
        self.first_to = 1
        self.game_id = ''
        self.is_inGame = False
        self._char = ''
        self._turn = T_OFF
        self.moves = 0
        self.name = 'reda'
        self.lvl = 0.55
        self.nbGames = 0
        self._wins = 0
        self.again = A_OFF
        self._res = 'Draw Match !'
        self._board = [ ["","",""], ["","",""], ["","",""] ]

        self.setup  = copy.deepcopy(msgsDic[game_setup])
        self.inGame = copy.deepcopy(msgsDic[in_gaming])
        self.gameResult = copy.deepcopy(msgsDic[game_reslt])
        self.partyResult = copy.deepcopy(msgsDic[party_reslt])
        self.playAgainMsg   = copy.deepcopy(msgsDic[rePlay_req])
        self.waitingMsg = copy.deepcopy(msgsDic[wait4Match])
    
    @property
    def wins(self):
        return self._wins
    @wins.setter
    def wins(self, value):
        self._wins = value
        self.partyResult["myscore"] = value
        self.inGame["wins"] = value
        self.setup["wins"] = value
        self.gameResult["wins"] = value

    @property
    def turn(self):
        return self._turn
    @turn.setter
    def turn(self, value):
        self._turn = value
        self.setup["turn"] = value
        self.inGame["turn"] = value

    @property
    def char(self):
        return self._char
    @char.setter
    def char(self,value):
        self._char = value
        self.gameResult["player"] = value
        self.setup["player"] = value

    @property
    def res(self):
        return self._res
    @res.setter
    def res(self, value):
        self._res = value
        self.gameResult["msg"] = value

    @property
    def board(self):
        return self._board
    @board.setter
    def board(self, value):
        self._board = value
        self.inGame["board"] = value
        self.gameResult["board"] = value