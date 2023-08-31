network_HUE = 250;

Blockly.Blocks['GET'] = {
  init: function() {
      this.setColour(network_HUE);
      this.appendDummyInput().appendField(Blockly.GETREQ);
      this.appendValueInput("url").setCheck("String");
      this.appendDummyInput().appendField(Blockly.WAITREQ);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"data"+","+"status");
      this.setInputsInline(true);
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip("");
  },
  getVars:function(){
      return ["data", "status"]
  }
};

Blockly.Blocks['POST'] = {
  init: function() {
      this.setColour(network_HUE);
      this.appendDummyInput().appendField(Blockly.POSTREQ);
      this.appendValueInput("url").setCheck("String");
      this.appendDummyInput().appendField(Blockly.USEDATA);
      this.appendValueInput("data").setCheck("String");
      this.appendDummyInput().appendField(Blockly.WAITREQ);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"data"+","+"status");
      this.setInputsInline(true);
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip("");
  },
  getVars:function(){
      return ["data", "status"]
  }
};

Blockly.Blocks['GETJSON'] = {
  init: function() {
      this.setColour(network_HUE);
      this.appendDummyInput().appendField(Blockly.GETREQ);
      this.appendValueInput("url").setCheck("String");
      this.appendDummyInput().appendField(Blockly.WAITJSONREQ);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"data"+","+"status");
      //var componentDb = workspace.getComponentDatabase();
      /*
      var params = ["data", "status"]
      if (params.length > 0) {
        var paramInput = this.appendDummyInput('PARAMETERS')
                             .appendField(" ")
                             .setAlign(Blockly.ALIGN_LEFT);
        var i = 0;
        for (param in params) {
          //var field = new Blockly.FieldEventFlydown(param, componentDb, Blockly.FieldFlydown.DISPLAY_BELOW);
          //paramInput.appendField(field, 'VAR' + i).appendField(" ");
          i = i+1;
        }
      }
      */
      
      this.setInputsInline(true);
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip("");
      
  },
  getVars:function(){
      return ["data", "status"]
  }
};

message_HUE = 350;

Blockly.Blocks['recieve_any_message'] = {
    init: function() {
        this.setColour(message_HUE);
        this.appendDummyInput().appendField(Blockly.RECEIVE+Blockly.ANY_MESSAGE);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"topic"+","+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["topic","message"]
    }
};

Blockly.Blocks['recieve_topic_message'] = {
    init: function() {
        this.setColour(message_HUE);
        this.appendDummyInput().appendField(Blockly.RECEIVE);
        this.appendValueInput("topic").setCheck("String");
        this.appendDummyInput().appendField(Blockly.TOPIC_MESSAGE);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"topic"+","+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["topic","message"]
    }
};

Blockly.Blocks['alert'] = {
  init: function() {
    this.setColour(message_HUE);
    this.appendDummyInput().appendField(Blockly.Msg.TEXT_APPEND_TO);
    this.appendDummyInput().appendField(Blockly.Msg.ALERT_MESSAGE);
    this.appendValueInput("message").setCheck("String");
    this.appendDummyInput().appendField(Blockly.MESSAGE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);        
    this.setTooltip("");
}
};

Blockly.Blocks['publish_message'] = {
    init: function() {
        this.setColour(message_HUE);
        this.appendDummyInput().appendField(Blockly.Msg.TEXT_APPEND_TO);
        this.appendValueInput("topic").setCheck("String");
        this.appendDummyInput().appendField(Blockly.PUBLISH_MESSAGE);
        this.appendValueInput("message").setCheck("String");
        this.appendDummyInput().appendField(Blockly.MESSAGE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);        
        this.setTooltip("");
    }
};

Blockly.Blocks['publish_project_message'] = {
  init: function() {
      this.setColour(message_HUE);
      this.appendDummyInput().appendField(Blockly.Msg.TEXT_APPEND_TO);
      this.appendValueInput("project").setCheck("String");
      this.appendDummyInput().appendField(Blockly.Msg.VARIABLES_DEFAULT_NAME);
      this.appendValueInput("topic").setCheck("String");
      this.appendDummyInput().appendField(Blockly.PUBLISH_MESSAGE);
      this.appendValueInput("message").setCheck("String");
      this.appendDummyInput().appendField(Blockly.MESSAGE);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);        
      this.setTooltip("");
  }
};

button_HUE = "#CFA45A";

Blockly.Blocks['button_down'] = {
    init: function() {
        this.setColour(button_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BUTTON_DOWN);
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['button_up'] = {
    init: function() {
        this.setColour(button_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BUTTON_UP);
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
}; 

Blockly.Blocks['button_recieve_message'] = {
    init: function() {
        this.setColour(button_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BUTTON_RECIEVE_MESSAGE);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['button_switch'] = {
    init: function() {
        this.setColour(button_HUE);
        this.appendDummyInput().appendField(Blockly.BUTTON_SWITCH);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BUTTON_SWITCH_STATE + Blockly.MIXLY_MICROPYTHON_SOCKET_TO);
        this.appendDummyInput().appendField(new Blockly.FieldDropdown([["开",'true'],["关",'false']]), "state");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['get_button_state'] = {
    init: function() {
        this.setColour(button_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BUTTON_SWITCH_STATE);
        this.setOutput(true, null);
        this.setTooltip("");
    }
};

slider_HUE = "#C43C4C";

Blockly.Blocks['drag_slider'] = {
    init: function() {
        this.setColour(slider_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.DRAG_SLIDER);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['slider_recieve_message'] = {
    init: function() {
        this.setColour(slider_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.SLIDER_RECIEVE_MESSAGE);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['change_slider'] = {
    init: function() {
        this.setColour(slider_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_CHANGE);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.SLIDER_NUM_IS);
        this.appendValueInput("value").setCheck("Number");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['get_slider_num'] = {
    init: function() {
        this.setColour(slider_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.SLIDER_NUM);
        this.setOutput(true, null);
        this.setTooltip("");
    }
};

textinput_HUE = "#E89F24";

Blockly.Blocks['when_textinput_send'] = {
    init: function() {
        this.setColour(textinput_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.WHEN_TEXTINPUT_SEND);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['through_textinput_send'] = {
    init: function() {
        this.setColour(textinput_HUE);
        this.appendDummyInput().appendField(Blockly.THROUGH);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.TEXTINPUT_SEND);
        this.appendValueInput("message").setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['get_keyboard_input'] = {
  init: function() {
      this.setColour(textinput_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.GET_KEYBOARD_INPUT);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};

joystick_HUE = "#7D9AC3";

Blockly.Blocks['when_joystick_dragged'] = {
    init: function() {
        this.setColour(joystick_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.JOYSTICK_DRAGGED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"x, "+"y");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["x","y"];
    }
};

Blockly.Blocks['through_joystick_send'] = {
    init: function() {
        this.setColour(joystick_HUE);
        this.appendDummyInput().appendField(Blockly.THROUGH);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.JOYSTICK_SENDXY);
        this.appendValueInput("x").setCheck("Number").appendField('x');
        this.appendDummyInput().appendField(",");
        this.appendValueInput("y").setCheck("Number").appendField('y');
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['get_joystick_x'] = {
    init: function() {
        this.setColour(joystick_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.JOYSTICK_X).appendField('x');
        this.setOutput(true, null);
        this.setTooltip("");
    }
};

Blockly.Blocks['get_joystick_y'] = {
    init: function() {
        this.setColour(joystick_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.JOYSTICK_Y).appendField('y');
        this.setOutput(true, null);
        this.setTooltip("");
    }
};



rgb_HUE = "#A3C16B";

Blockly.Blocks['RGB_selected'] = {
    init: function() {
        this.setColour(rgb_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.RGB_COLOR_SELECTED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"R, "+"G, "+"B");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["R","G","B"];
    }
};

Blockly.Blocks['RGB_recieved'] = {
    init: function() {
        this.setColour(rgb_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.RGB_MESSAGE_RECIEVED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"R, "+"G, "+"B");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["R","G","B"];
    }
};

Blockly.Blocks['through_RGB_send'] = {
    init: function() {
        this.setColour(rgb_HUE);
        this.appendDummyInput().appendField(Blockly.THROUGH);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.RGB_SEND);
        this.appendValueInput("R").setCheck("Number").appendField("R");
        this.appendValueInput("G").setCheck("Number").appendField("G");
        this.appendValueInput("B").setCheck("Number").appendField("B");
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    }
};

Blockly.Blocks['get_RGB_color'] = {
    init: function() {
        this.setColour(rgb_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.RGB_NOW_COLOR);
        this.setOutput(true, null);
        this.setTooltip("");
    }
};

bulb_HUE = "#506AD4";


Blockly.Blocks['bulb_recieved'] = {
    init: function() {
        this.setColour(bulb_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BULB_RECIEVED_MESSAGE);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['bulb_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.TO);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.SEND_MESSAGE)
      .appendField(new Blockly.FieldDropdown([["关闭",'0'],["绿灯",'1'],["黄灯",'2'],["红灯",'3']]), "message");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(bulb_HUE);
    this.setTooltip('');
  }
  };

Blockly.Blocks['get_bulb_state'] = {
    init: function() {
        this.setColour(bulb_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BULB_NOW_STATE);
        this.setOutput(true, null);
        this.setTooltip("");
    }
};

textLED_HUE = "#479DA8";

Blockly.Blocks['textLED_recieved'] = {
    init: function() {
        this.setColour(textLED_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.LED_RECIEVED_MESSAGE);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['textLED_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.TO);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.TEXTLED_SEND_MESSAGE);
    this.appendValueInput("message").setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(textLED_HUE);
    this.setTooltip('');
  }
  };

Blockly.Blocks['get_textLED'] = {
    init: function() {
        this.setColour(textLED_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.TEXTLED_NOW);
        this.setOutput(true, null);
        this.setTooltip("");
}
};


lineChart_HUE = "#1D33A8";


Blockly.Blocks['lineChart_recieved'] = {
    init: function() {
        this.setColour(lineChart_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.LINECHART_RECIEVED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"time, "+"value");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["time","value"];
    }
};

Blockly.Blocks['lineChart_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.TO);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.LINECHART_SEND_MESSAGE);
    this.appendValueInput("message").setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(lineChart_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['clear_lineChart'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.LET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.CLEAR_LINECHART);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(lineChart_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['get_all_messages'] = {
    init: function() {
        this.setColour(lineChart_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.LINECHART_ALL_MESSAGE);
        this.setOutput(true, null);
        this.setTooltip("");
}
};

Blockly.Blocks['get_N_messages'] = {
    init: function() {
        this.setColour(lineChart_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.LINECHART_N_MESSAGE);
        this.appendValueInput("num").setCheck("Number");
        this.appendDummyInput().appendField(Blockly.LINECHART_MESSAGE);
        this.setOutput(true, null);
        this.setTooltip("");
}
};

Blockly.Blocks['get_latest_message'] = {
    init: function() {
        this.setColour(lineChart_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.LINECHART_LATEST_MESSAGE);
        this.setOutput(true, null);
        this.setTooltip("");
}
};

barChart_HUE = "#50A876";

Blockly.Blocks['barChart_recieved'] = {
    init: function() {
        this.setColour(barChart_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BARCHART_RECIEVED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['barChart_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.TO);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.BARCHART_SEND_MESSAGE);
    this.appendValueInput("message").setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(barChart_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['clear_barChart'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.LET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.CLEAR_BARCHART);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(barChart_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['get_now_messages'] = {
    init: function() {
        this.setColour(barChart_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.BARCHART_NOW_MESSAGE);
        this.setOutput(true, null);
        this.setTooltip("");
}
};

datasheet_HUE = "#541DA8";

Blockly.Blocks['datasheet_recieved'] = {
    init: function() {
        this.setColour(datasheet_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.DATASHEET_RECIEVED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['datasheet_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.TO);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.DATASHEET_SEND_MESSAGE);
    this.appendValueInput("message");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(datasheet_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['clear_datasheet'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.LET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.CLEAR_DATASHEET);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(datasheet_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['get_datasheet_all_messages'] = {
    init: function() {
        this.setColour(datasheet_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.DATASHEET_ALL_MESSAGE);
        this.setOutput(true, null);
        this.setTooltip("");
}
};


dashboard_HUE = "#CC4375";

Blockly.Blocks['dashboard_recieved'] = {
    init: function() {
        this.setColour(dashboard_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.DASHBOARD_RECIEVED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["message"];
    }
};

Blockly.Blocks['dashboard_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.TO);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.DASHBOARD_SEND_MESSAGE);
    this.appendValueInput("message").setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(dashboard_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['get_dashboard_now_messages'] = {
    init: function() {
        this.setColour(dashboard_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.DASHBOARD_NOW_MESSAGE);
        this.setOutput(true, null);
        this.setTooltip("");
}
};

datamap_HUE = "#DE4E49";


Blockly.Blocks['get_long'] = {
  init: function() {
      this.setColour(datamap_HUE);
      this.appendDummyInput().appendField(Blockly.GET_LONG);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};

Blockly.Blocks['get_lati'] = {
  init: function() {
      this.setColour(datamap_HUE);
      this.appendDummyInput().appendField(Blockly.GET_LATI);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};


Blockly.Blocks['datamap_recieved'] = {
    init: function() {
        this.setColour(datamap_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.DATAMAP_RECIEVED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"clientid, "+"long, "+"lat, "+"message");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["clientid","long","lat","message"];
    }
};

Blockly.Blocks['datamap_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.TO);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.DATAMAP);
    this.appendValueInput("long").setCheck("Number");
    this.appendDummyInput().appendField(Blockly.DATAMAP_LONG);
    this.appendValueInput("lat").setCheck("Number");
    this.appendDummyInput().appendField(Blockly.DATAMAP_LAT+Blockly.DATAMAP_SEND_MESSAGE);
    this.appendValueInput("message").setCheck("String");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(datamap_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['clear_datamap'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.LET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.CLEAR_DATAMAP);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(datamap_HUE);
    this.setTooltip('');
  }
};

weathersynced_HUE = "#E06D39";

Blockly.Blocks['ws_updated'] = {
    init: function() {
        this.setColour(weathersynced_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.WS_UPDATED);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"district, "+"weather_type, "+"temperature, "+"humidity, "+"wind_dir, "+"wind_class");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["district","weather_type","temperature","humidity","wind_dir","wind_class"];
    }
};

Blockly.Blocks['ws_send'] = {
    init: function() {
        this.setColour(weathersynced_HUE);
        this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
        this.appendValueInput("name").setCheck("String");
        this.appendDummyInput().appendField(Blockly.WS_SEND);
        this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"district, "+"weather_type, "+"temperature, "+"humidity, "+"wind_dir, "+"wind_class");
        this.setInputsInline(true);
        this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip("");
    },
    getVars:function(){
        return ["district","weather_type","temperature","humidity","wind_dir","wind_class"];
    }
};

Blockly.Blocks['let_ws_update'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.LET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.LET_WS_UPDATE);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(weathersynced_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['let_ws_send'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.LET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.LET_WS_SEND);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(weathersynced_HUE);
    this.setTooltip('');
  }
};

Blockly.Blocks['get_ws_para'] = {
    init: function() {
    this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.WS_PARA)
      .appendField(new Blockly.FieldDropdown([["天气",'"weather_type"'],["温度",'"temperature"'],["湿度",'"humidity"'],["风向",'"wind_dir"'],["风级",'"wind_class"'],["区域信息",'"district"']]), "message");
    this.appendDummyInput().appendField(Blockly.WS_INFO);
    this.setInputsInline(true);
    this.setColour(weathersynced_HUE);
    this.setTooltip('');
    this.setOutput(true, "String");
  }
  };

 dicts_HUE = 345;



 Blockly.Blocks['dicts_create_with'] = {

    /**
     * Block for creating a list with any number of elements of any type.
     * @this Blockly.Block
     */

     init: function () {
      this.setColour(dicts_HUE);
      this.appendDummyInput("")
      .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
      .appendField(new Blockly.FieldLabel(Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH), 'TIP')
      this.itemCount_ = 3;
      this.updateShape_();
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setMutator(new Blockly.Mutator(['dicts_create_with_item']));
      this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_TOOLTIP);
    },

    /**
     * Create XML to represent list inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */

     mutationToDom: function () {
      var container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
    },

    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */

     domToMutation: function (xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },

    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */

     decompose: function (workspace) {
      var containerBlock =
      workspace.newBlock('dicts_create_with_container');
      containerBlock.initSvg();
      var connection = containerBlock.getInput('STACK').connection;
      for (var i = 0; i < this.itemCount_; i++) {
        var itemBlock = workspace.newBlock('dicts_create_with_item');
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },

    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */

     compose: function (containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');

        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
          connections[i] = itemBlock.valueConnection_;
          itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
          i++;
        }

        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
          if (connections[i]) {
            this.getInput('ADD' + i).connection.connect(connections[i]);
          }
        }
      },

    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */

     saveConnections: function (containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      var i = 0;
      while (itemBlock) {
        var input = this.getInput('ADD' + i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
      }
    },

    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */

     updateShape_: function () {
        // Delete everything.
        if (this.getInput('EMPTY')) {
          this.removeInput('EMPTY');
        }

        var keyNames = [];
        for (var i = 0; this.getInput('ADD' + i); i++) {
            //this.getInput('VALUE' + i).removeField("KEY"+i);
            keyNames.push(this.getFieldValue("KEY" + i))
            this.removeInput('ADD' + i);
          }
        // Rebuild block.
        if (this.itemCount_ == 0) {
          this.getField('TIP').setValue(Blockly.Msg.DICTS_CREATE_EMPTY_TITLE);
        } else {
          this.getField('TIP').setValue(Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH);
          for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
              new Blockly.FieldTextInput(
                keyNames.length > i
                ? keyNames[i]
                : (i == 0 ? '"key"' :'"key'+(i+1)+'"')),
              'KEY'+i)
            .appendField(":")
          }
        }
      }, getVars: function () {
        return [this.getFieldValue('VAR')];
      },
      renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };



    Blockly.Blocks['dicts_create_with_container'] = {

  /**
   * Mutator block for list container.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendDummyInput()
    .appendField(Blockly.MIXLY_MICROBIT_TYPE_DICT);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_CONTAINER_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['dicts_create_with_item'] = {
  /**
   * Mutator bolck for adding items.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendDummyInput()
    .appendField(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TITLE);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['dicts_keys'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput("")        
    .appendField(Blockly.Msg.DICT_KEYS);  
    this.setTooltip(Blockly.Msg.DICTS_KEYS_TOOLTIP);      
    this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_get'] = {
  init: function() {
    this.setColour(dicts_HUE);
    // this.appendDummyInput("")
    
    //     .appendField(Blockly.Msg.DICTS_GET_FROM_DICTS)
    
    this.appendValueInput('DICT')
    .setCheck('Dict')    
    this.appendValueInput('KEY')
    .appendField(Blockly.Msg.DICTS_GET_IN)
    this.appendDummyInput("")   
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);
        
        this.setOutput(true);
        this.setTooltip(Blockly.Msg.DICTS_GET_TOOLTIP);
  }
};

Blockly.Blocks['dicts_get_default'] = {
  init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')    
    this.appendValueInput('KEY')
    .appendField(Blockly.Msg.DICTS_GET_IN)
    this.appendDummyInput("")   
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);
    this.appendValueInput('VAR')
        .appendField(Blockly.Msg.DICTS_DEFAULT_VALUE);    
    this.setOutput(true);
    this.setTooltip(Blockly.Msg.DICTS_GET_DEFAULT_TOOLTIP);
  }
};

    Blockly.Blocks['dicts_add_or_change'] = {
      init: function() {
        this.setColour(dicts_HUE);
        this.appendValueInput('DICT')
        this.appendValueInput('KEY')
        .appendField(Blockly.Msg.DICTS_ADD)
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        this.appendDummyInput()
        this.appendValueInput('VAR')
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DICTS_ADD_OR_CHANGE_TOOLTIP);
      }
    };


    Blockly.Blocks['dicts_delete'] = {
      init: function() {
        this.setColour(dicts_HUE);
        this.appendValueInput('DICT')
        this.appendValueInput('KEY')
        .appendField(Blockly.Msg.DICTS_DELETE_IN)
        this.appendDummyInput("")
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_DELETE_VALUE);
        
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DICTS_DELETE_TOOLTIP);
      }
    };


    Blockly.Blocks['dicts_update'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT2')
    .setCheck('Dict')
    .appendField(Blockly.Msg.MAKE_DICT)      
    this.appendValueInput('DICT')
    .setCheck('Dict')
    .appendField(Blockly.Msg.DICT_UPDATE); 
    this.appendDummyInput("")        
    .appendField(Blockly.MIXLY_MID);    
    this.setTooltip(Blockly.Msg.DICTS_UPDATE_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['dicts_clear'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput("")        
    .appendField(Blockly.Msg.DICT_CLEAR);  
    this.setTooltip(Blockly.Msg.DICTS_CLEAR_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['dicts_items'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput("")        
    
    .appendField(Blockly.Msg.DICT_ITEMS);  
    this.setTooltip(Blockly.Msg.DICTS_ITEMS_TOOLTIP);      
    this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_values'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput("")        
    
    .appendField(Blockly.Msg.DICT_VALUES);  
    this.setTooltip(Blockly.Msg.DICTS_VALUES_TOOLTIP);      
    this.setOutput(true, 'List');
  }
};

Blockly.Blocks['dicts_length'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput("")
    .appendField(Blockly.MIXLY_LENGTH)
    
    this.setTooltip(Blockly.Msg.DICT_LENGTH_TOOLTIP);
    this.setOutput(true, Number);
  }
};

Blockly.Blocks['dicts_deldict'] = {
  /**
   * Block for list length.
   * @this Blockly.Block
   */
   init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput("")        
    
    .appendField(Blockly.Msg.DICT_DELDICT);  
    this.setTooltip(Blockly.Msg.DICTS_DEL_TOOLTIP);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
  }
};

Blockly.Blocks['dicts_add_change_del'] = {
  /**
   * Block for getting sublist.
   * @this Blockly.Block
   */
   init: function() {
     
    this['MODE'] =
    [[Blockly.Msg.DICTS_ADD_OR_CHANGE, 'INSERT'],
    
    [Blockly.MIXLY_MICROBIT_JS_DELETE_VAR, 'DELETE']];
    this.setHelpUrl(Blockly.Msg.LISTS_GET_SUBLIST_HELPURL);
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput('AT2')
    this.appendValueInput('KEY')
    this.appendDummyInput("")   
    .appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_MAKE)
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);
        this.updateAt_(true);
        this.setInputsInline(true);
        this.setOutput(false);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        var b = this;
        this.setTooltip(function() {
          var e = b.getFieldValue("WHERE"),
          d = "";
          switch (e) {
            
            case "INSERT":
            d = Blockly.Msg.DICTS_ADD_TOOLTIP;
            break;
            case "DELETE":
            d = Blockly.Msg.DICTS_DELETE_TOOLTIP;
            break;
            
          }
            //if ("FROM_START" == e || "FROM_END" == e) d += "  " + Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP.replace("%1", Blockly.Blocks.ONE_BASED_INDEXING ? "#1": "#0");
            return d
          })
        
      },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
   mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
   domToMutation: function(xmlElement) {
    var isAt = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(isAt);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
   updateAt_: function(isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT2');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT2').setCheck(Number);
    } else {
      this.appendDummyInput('AT2');
    }
    var menu = new Blockly.FieldDropdown(this['MODE'],
      function(value) {
        var newAt = (value == 'INSERT') ;
          // The 'isAt' variable is available due to this function being a
          // closure.
          if (newAt != isAt) {
            var block = this.sourceBlock_;
            block.updateAt_(newAt);
            // This menu has been destroyed and replaced.
            // Update the replacement.
            block.setFieldValue(value, 'WHERE');
            return null;
          }
          return undefined;
        });
    
    this.getInput('AT2')
    .appendField(menu, 'WHERE');

    // this.moveInputBefore('AT2','LIST');
  }
};

Blockly.Blocks['dicts_pop'] = {
  init: function() {
    this.setColour(dicts_HUE);
    this.appendValueInput('DICT')
    .setCheck('Dict')
    this.appendDummyInput("")
    .appendField(Blockly.blockpy_DICT_POP)
    this.appendValueInput('KEY')
    this.appendDummyInput("")
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_ADD_VALUE);    
        this.setTooltip(Blockly.Msg.DICT_POP_TOOLTIP);
        this.setInputsInline(true);
        this.setOutput(true);
      }
    };

    Blockly.Blocks['dicts_setdefault'] = {
      init: function() {
        this.setColour(dicts_HUE);
        this.appendValueInput('DICT')
        .setCheck('Dict');
        this.appendValueInput('KEY')
        .appendField(Blockly.Msg.DICTS_SET_DEFAULT)
        this.appendDummyInput("")
        // .appendField(new Blockly.FieldTextInput('"key"'), 'KEY')
        .appendField(Blockly.Msg.DICTS_DEFAULT_VALUE);
        this.appendValueInput('VAR')    
        
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg.DICTS_SETDEFAULT_TOOLTIP);
      }
    };

    Blockly.Blocks['dicts_create_with_noreturn'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
   init: function () {
    this.setColour(dicts_HUE);
    this.appendDummyInput("")
        //    .appendField(new Blockly.FieldTextInput('mydict'), 'VAR')
        .appendField(new Blockly.FieldLabel(Blockly.MIXLY_MICROBIT_TYPE_DICT), 'TIP')
        .appendField(' ')
        this.itemCount_ = 3;
        this.updateShape_();
        this.setOutput(true, "Dict")
        this.setPreviousStatement(false);
        this.setNextStatement(false);
        this.setMutator(new Blockly.Mutator(['dicts_create_with_item']));
        this.setTooltip(Blockly.Msg.DICTS_CREATE_WITH_TOOLTIP);
      },

    /**
     * Create XML to represent list inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */

     mutationToDom: function () {
      var container = document.createElement('mutation');
      container.setAttribute('items', this.itemCount_);
      return container;
    },

    /**
     * Parse XML to restore the list inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */

     domToMutation: function (xmlElement) {
      this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
      this.updateShape_();
    },

    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */

     decompose: function (workspace) {
      var containerBlock =
      workspace.newBlock('dicts_create_with_container');
      containerBlock.initSvg();
      var connection = containerBlock.getInput('STACK').connection;
      for (var i = 0; i < this.itemCount_; i++) {
        var itemBlock = workspace.newBlock('dicts_create_with_item');
        itemBlock.initSvg();
        connection.connect(itemBlock.previousConnection);
        connection = itemBlock.nextConnection;
      }
      return containerBlock;
    },

    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */

     compose: function (containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');

        // Count number of inputs.
        var connections = [];
        var i = 0;
        while (itemBlock) {
          connections[i] = itemBlock.valueConnection_;
          itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
          i++;
        }

        this.itemCount_ = i;
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 0; i < this.itemCount_; i++) {
          if (connections[i]) {
            this.getInput('ADD' + i).connection.connect(connections[i]);
          }
        }
      },

    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */

     saveConnections: function (containerBlock) {
      var itemBlock = containerBlock.getInputTargetBlock('STACK');
      var i = 0;
      while (itemBlock) {
        var input = this.getInput('ADD' + i);
        itemBlock.valueConnection_ = input && input.connection.targetConnection;
        i++;
        itemBlock = itemBlock.nextConnection &&
        itemBlock.nextConnection.targetBlock();
      }
    },

    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */

     updateShape_: function () {
        // Delete everything.
        if (this.getInput('EMPTY')) {
          this.removeInput('EMPTY');
        }

        var keyNames = [];
        for (var i = 0; this.getInput('ADD' + i); i++) {
            //this.getInput('VALUE' + i).removeField("KEY"+i);
            keyNames.push(this.getFieldValue("KEY" + i))
            this.removeInput('ADD' + i);
          }
        // Rebuild block.
        if (this.itemCount_ == 0) {
          this.getField('TIP').setValue(Blockly.Msg.LOGIC_NULL+Blockly.MIXLY_MICROBIT_TYPE_DICT);
        } else {
          this.getField('TIP').setValue(Blockly.MIXLY_MICROBIT_TYPE_DICT);
          for (var i = 0; i < this.itemCount_; i++) {
            this.appendValueInput('ADD' + i)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(
              new Blockly.FieldTextInput(
                keyNames.length > i
                ? keyNames[i]
                : (i == 0 ? '"key"' :'"key'+(i+1)+'"')),
              'KEY'+i)
            .appendField(":")
          }

        }
      }, getVars: function () {
        return [this.getFieldValue('VAR')];
      },
      renameVar: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
          this.setTitleValue(newName, 'VAR');
        }
      }
    };


Blockly.Blocks['dicts_todict'] = {
  init: function () {
    this.setColour(dicts_HUE);
    this.appendValueInput('VAR')
    .appendField(Blockly.MIXLY_TODICT);
    this.setOutput(true);
    this.setTooltip(Blockly.MIXLY_PYTHON_TOOLTIP_TODICT);
  }
};    
control_HUE = "#5BA55B"
Blockly.Blocks['log_message'] = {
  init: function() {
      this.setColour(control_HUE);
      this.appendDummyInput().appendField(Blockly.Msg.PRINT_MESSAGE);
      this.appendValueInput("message").setCheck("String");
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);        
      this.setTooltip("");
  }
};
Blockly.Blocks['setInterval'] = {
  init: function() {
      this.setColour(control_HUE);//颜色根据放在哪个分类下改
      this.appendDummyInput().appendField(Blockly.Msg.EVERY);
      this.appendValueInput("time").setCheck("Number");
      this.appendDummyInput().appendField(Blockly.Msg.MILLISECOND);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);   
      this.setTooltip('');
this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
} 
};

Blockly.Blocks['setTimeout'] = {
  init: function() {
      this.setColour(control_HUE);//颜色根据放在哪个分类下改
      this.appendValueInput("time").setCheck("Number");
      this.appendDummyInput().appendField(Blockly.Msg.MILLISECOND);
      this.appendDummyInput().appendField(Blockly.Msg.AFTER);
      this.setInputsInline(true);
      this.setPreviousStatement(true);
      this.setNextStatement(true);   
      this.setTooltip('');
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
} 
};

MATH_HUE = "#5B67A5"
Blockly.Blocks['current_time'] = {
  init: function() {
    this.appendDummyInput().appendField(Blockly.Msg.CURRENT_TIME);
    this.setOutput(true, "String");
    this.setColour("5BA58C");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['math_parse_int'] = {
  init: function() {
      this.setColour(MATH_HUE);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.PARSE_INT);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};

Blockly.Blocks['math_parse_float'] = {
  init: function() {
      this.setColour(MATH_HUE);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.PARSE_FLOAT);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};


Blockly.Blocks['json2text'] = {
  init: function() {
      this.setColour("#5BA58C");
      this.appendValueInput("name");
      this.appendDummyInput().appendField(Blockly.JSON2TEXT);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};

Blockly.Blocks['text2json'] = {
  init: function() {
      this.setColour("#5BA58C");
      this.appendValueInput("name");
      this.appendDummyInput().appendField(Blockly.TEXT2JSON);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};

Blockly.Blocks['get_accessToken'] = {
  init: function() {
      this.setColour("#1cc88a");
      this.appendDummyInput().appendField(Blockly.USEAPIKEY);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.USESECRETKEY);
      this.appendValueInput("name2").setCheck("String");
      this.appendDummyInput().appendField(Blockly.GETTOKEN);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};

Blockly.Blocks['translate'] = {
  init: function() {
      this.setColour("#1cc88a");
      this.appendDummyInput().appendField(Blockly.TRANSORIGIN);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.USETEXT);
      this.appendValueInput("name2").setCheck("String");
      this.appendDummyInput().appendField(Blockly.TOLANG);
      this.appendValueInput("name3").setCheck("String");
      this.appendDummyInput().appendField(Blockly.PARA1);
      this.setInputsInline(true);
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  },
  getVars:function(){
      return ["result"];
  }
};

Blockly.Blocks['chat'] = {
  init: function() {
      this.setColour("#1cc88a");
      this.appendDummyInput().appendField(Blockly.TRANSORIGIN);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.USETEXT2);
      this.appendValueInput("name2").setCheck("String");
      this.appendDummyInput().appendField(Blockly.BOT);
      this.appendDummyInput().appendField(Blockly.PARA1);
      this.setInputsInline(true);
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('');
  },
  getVars:function(){
      return ["result"];
  }
};