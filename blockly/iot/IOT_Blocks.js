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

message_HUE = '#1cc88a';

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

button_HUE = "#4e73df";

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

Blockly.Blocks['pixel_switch'] = {
  init: function() {
      this.setColour(button_HUE);
      this.appendDummyInput().appendField(Blockly.PIXEL_SWITCH);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.PIXEL_SWITCH_STATE);
      this.appendDummyInput().appendField("x");
      this.appendValueInput("X").setCheck("Number");
      this.appendDummyInput().appendField("y");
      this.appendValueInput("Y").setCheck("Number");
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROPYTHON_SOCKET_TO);
      this.appendDummyInput().appendField(new Blockly.FieldDropdown([["亮",'true'],["灭",'false']]), "state");
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

slider_HUE = "#4e73df";

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

textinput_HUE = "#4e73df";

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

Blockly.Blocks['through_select_send'] = {
  init: function() {
      this.setColour(textinput_HUE);
      this.appendDummyInput().appendField(Blockly.THROUGH);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.SELECT_SEND);
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

Blockly.Blocks['get_select_options'] = {
  init: function() {
      this.setColour(textinput_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.GET_SELECT_OPTIONS);
      this.setOutput(true, null);
      this.setTooltip("");
  }
};

joystick_HUE = "#4e73df";

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



rgb_HUE = "#4e73df";

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

bulb_HUE = "#4e73df";


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

textLED_HUE = "#4e73df";

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


lineChart_HUE = "#4e73df";


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

Blockly.Blocks['timer_triggered'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.TIMER_TRIGGERED);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"value");
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

Blockly.Blocks['get_trigger_times'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.GET_TRIGGER_TIMES);
      this.setOutput(true, null);
      this.setTooltip("");
}
};

Blockly.Blocks['trigger_triggered'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.TRIGGER_TRIGGERED);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"value");
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

Blockly.Blocks['get_trigger_triggers'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.GET_TRIGGER_TRIGGERS);
      this.setOutput(true, null);
      this.setTooltip("");
}
};

Blockly.Blocks['bluetooth_triggered'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.BLUETOOTH_TRIGGERED);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"value");
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

Blockly.Blocks['get_bluetooth_status'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_PY_STORAGE_GET);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.GET_BLUETOOTH_STATUS);
      this.setOutput(true, null);
      this.setTooltip("");
}
};

Blockly.Blocks['bluetooth_sent'] = {
  init: function() {
  this.appendDummyInput().appendField(Blockly.TO);
  this.appendValueInput("name").setCheck("String");
  this.appendDummyInput().appendField(Blockly.BLUETOOTH_SENT);
  this.appendValueInput("message").setCheck("String");
  this.setInputsInline(true);
  this.setPreviousStatement(true);
  this.setNextStatement(true);
  this.setColour(lineChart_HUE);
  this.setTooltip('');
}
};

Blockly.Blocks['camera_sent'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.CAMERA_SENT);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"value");
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

Blockly.Blocks['mic_sent'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.MIC_SENT);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"value");
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

Blockly.Blocks['select_sent'] = {
  init: function() {
      this.setColour(lineChart_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.SELECT_SENT);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"value");
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

barChart_HUE = "#4e73df";

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

datasheet_HUE = "#4e73df";

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


dashboard_HUE = "#4e73df";

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

datamap_HUE = "#4e73df";


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

Blockly.Blocks['face_recognized'] = {
  init: function() {
      this.setColour(datamap_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.FACE_RECOGNIZED);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"id, status, faceName, isMouthOpen, faceProbability, happy, sad, angry, surprised, disgusted, fearful");
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

Blockly.Blocks['clear_pixel'] = {
  init: function() {
  this.appendDummyInput().appendField(Blockly.LET);
  this.appendValueInput("name").setCheck("String");
  this.appendDummyInput().appendField(Blockly.CLEAR_PIXEL);
  this.setInputsInline(true);
  this.setPreviousStatement(true);
  this.setNextStatement(true);
  this.setColour(datamap_HUE);
  this.setTooltip('');
}
};

weathersynced_HUE = "#4e73df";

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

Blockly.Blocks['current_time_string'] = {
  init: function() {
    this.appendDummyInput().appendField(Blockly.Msg.CURRENT_TIME + "(LocaleString)");
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
      this.setColour(network_HUE);
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
      this.setColour(network_HUE);
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
      this.setColour(network_HUE);
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

Blockly.JavaScript.GET=function(block) {
  var url = Blockly.JavaScript.valueToCode(this, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_code=Blockly.JavaScript.statementToCode(block, "DO0" );
  var code_piece=[];
      code_piece=statement_code.split("\n");
      for(var i=0;i<code_piece.length;i++){
        if((code_piece[i].indexOf("    ") >= 0)){  
            code_piece[i]=code_piece[i].replace("    ","        ");
        }
      }   
      statement_code=""
      for(var i=0;i<code_piece.length;i++){
          statement_code+=code_piece[i]+'\n'
      }
  var code="$.get("+url+", function(data, status){\n\t"+statement_code+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.POST=function(block) {
  var url = Blockly.JavaScript.valueToCode(this, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var data = Blockly.JavaScript.valueToCode(this, 'data', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_code=Blockly.JavaScript.statementToCode(block, "DO0" );
  var code_piece=[];
      code_piece=statement_code.split("\n");
      for(var i=0;i<code_piece.length;i++){
        if((code_piece[i].indexOf("    ") >= 0)){  
            code_piece[i]=code_piece[i].replace("    ","        ");
        }
      }   
      statement_code=""
      for(var i=0;i<code_piece.length;i++){
          statement_code+=code_piece[i]+'\n'
      }
  var code="$.post("+url+", " + data + ", function(data, status){\n\t"+statement_code+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.GETJSON=function(block) {
  var url = Blockly.JavaScript.valueToCode(this, 'url', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_code=Blockly.JavaScript.statementToCode(block, "DO0" );
  var code_piece=[];
      code_piece=statement_code.split("\n");
      for(var i=0;i<code_piece.length;i++){
        if((code_piece[i].indexOf("    ") >= 0)){  
            code_piece[i]=code_piece[i].replace("    ","        ");
        }
      }   
      statement_code=""
      for(var i=0;i<code_piece.length;i++){
          statement_code+=code_piece[i]+'\n'
      }
  var code="$.getJSON("+url+", function(data, status){\n\t"+statement_code+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.recieve_any_message=function(block) {
  var code="MixIO.onMessage(function(topic,message){\n"+Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.recieve_topic_message=function(block) {
  var topic = Blockly.JavaScript.valueToCode(this, 'topic', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_code=Blockly.JavaScript.statementToCode(block, "DO0" );
  var code_piece=[];
      code_piece=statement_code.split("\n");
      for(var i=0;i<code_piece.length;i++){
        if((code_piece[i].indexOf("    ") >= 0)){  
            code_piece[i]=code_piece[i].replace("    ","        ");
        }
      }   
      statement_code=""
      for(var i=0;i<code_piece.length;i++){
          statement_code+=code_piece[i]+'\n'
      }
  var code="MixIO.onMessage(function(topic,message){\n\t"+"if(topic === "+topic+"){\n"+statement_code+"\n"+"}})\n"
  return code;
};

Blockly.JavaScript.alert=function(block) {
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.alert("+message+")\n"
  return code;
};

Blockly.JavaScript.publish_message=function(block) {
  var topic = Blockly.JavaScript.valueToCode(this, 'topic', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.publish("+topic+","+message+")\n"
  return code;
};

Blockly.JavaScript.publish_project_message=function(block) {
  var project = Blockly.JavaScript.valueToCode(this, 'project', Blockly.JavaScript.ORDER_ATOMIC);
  var topic = Blockly.JavaScript.valueToCode(this, 'topic', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="propublish("+project+","+topic+","+message+")\n"
  return code;
};

Blockly.JavaScript.button_down=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BUTTON)\n"+".bind(MixIO.eventTags.BUTTON_PRESSED, function(){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.button_up=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BUTTON)\n"+".bind(MixIO.eventTags.BUTTON_LOOSED, function(){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.button_recieve_message=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BUTTON)\n"+".bind(MixIO.eventTags.BUTTON_CHANGED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.button_switch=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var state = this.getFieldValue('state');
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BUTTON)\n"+".trigger(MixIO.actionTags.BUTTON_SWITCH,"+state+")\n";
  return code;
};

Blockly.JavaScript.pixel_switch=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var state = this.getFieldValue('state');
  var x = Blockly.JavaScript.valueToCode(this, 'X', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(this, 'Y', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.PIXEL)\n"+".trigger(MixIO.actionTags.PIXEL_SWITCH,["+x + ","+y + "," + state+"])\n";
  return code;
};

Blockly.JavaScript.get_button_state=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BUTTON).isOn()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.drag_slider=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.SLIDER)\n"+".bind(MixIO.eventTags.SLIDER_SLIDED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.slider_recieve_message=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.SLIDER)\n"+".bind(MixIO.eventTags.SLIDER_CHANGED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.change_slider=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var value = Blockly.JavaScript.valueToCode(this, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.SLIDER)\n"+".trigger(MixIO.actionTags.SLIDER_SEND,"+value+")\n"
  return code;
};

Blockly.JavaScript.get_slider_num=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.SLIDER).getValue()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.when_textinput_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.KEYBOARD)\n"+".bind(MixIO.eventTags.KEYBOARD_SENT, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code;
};

Blockly.JavaScript.through_textinput_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.KEYBOARD)\n"+".trigger(MixIO.actionTags.KEYBOARD_SEND,"+message+")\n"
  return code;
};

Blockly.JavaScript.through_select_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.SELECT)\n"+".trigger(MixIO.actionTags.SELECT_SEND,"+message+")\n"
  return code;
};

Blockly.JavaScript.when_joystick_dragged=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.JOYSTICK)\n"+".bind(MixIO.eventTags.JOYSTICK_CHANGED, function(event,x,y){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.get_keyboard_input=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.KEYBOARD).getText()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.get_select_options=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.SELECT).getOptions()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.through_joystick_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var x = Blockly.JavaScript.valueToCode(this, 'x', Blockly.JavaScript.ORDER_ATOMIC);
  var y = Blockly.JavaScript.valueToCode(this, 'y', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.JOYSTICK)\n"+".trigger(MixIO.actionTags.JOYSTICK_SEND,["+x+","+y+"])\n"
  return code; 
};

Blockly.JavaScript.get_joystick_x=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.JOYSTICK).getX()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.get_joystick_y=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.JOYSTICK).getY()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.RGB_selected=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.RGB_PICKER)\n"+".bind(MixIO.eventTags.RGB_PICKER_PICKED, function(event,R,G,B){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.RGB_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.RGB_PICKER)\n"+".bind(MixIO.eventTags.RGB_PICKER_CHANGED, function(event,R,G,B){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.through_RGB_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var R = Blockly.JavaScript.valueToCode(this, 'R', Blockly.JavaScript.ORDER_ATOMIC);
  var G = Blockly.JavaScript.valueToCode(this, 'G', Blockly.JavaScript.ORDER_ATOMIC);
  var B = Blockly.JavaScript.valueToCode(this, 'B', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.RGB_PICKER)\n"+".trigger(MixIO.actionTags.RGB_PICKER_SEND,["+R+","+G+","+B+"])\n"
  return code; 
};

Blockly.JavaScript.get_RGB_color=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.RGB_PICKER).getColor()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.bulb_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BULB)\n"+".bind(MixIO.eventTags.BULB_CHANGED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.bulb_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = this.getFieldValue('message');
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BULB)\n"+".trigger(MixIO.actionTags.BULB_CHANGE,"+message+")\n"
  return code; 
};

Blockly.JavaScript.get_bulb_state=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BULB).getStatus()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.textLED_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.TEXT_SCREEN)\n"+".bind(MixIO.eventTags.TEXT_SCREEN_CHANGED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.textLED_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.TEXT_SCREEN)\n"+".trigger(MixIO.actionTags.TEXT_SCREEN_CHANGE,"+message+")\n"
  return code; 
};

Blockly.JavaScript.get_textLED=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.TEXT_SCREEN).getText()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.lineChart_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.LINE_CHART)\n"+".bind(MixIO.eventTags.LINE_CHART_CHANGED, function(event,time,value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.timer_triggered=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.TIMER)\n"+".bind(MixIO.eventTags.TIMER_TRIGGERED, function(event,value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.get_trigger_times=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.TIMER).getTriggerTimes()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.trigger_triggered=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.TRIGGER)\n"+".bind(MixIO.eventTags.TRIGGER_TRIGGERED, function(event,value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.get_trigger_triggers=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.TRIGGER).getTriggerTimes()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.bluetooth_triggered=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BLE)\n"+".bind(MixIO.eventTags.BLUETOOTH_TRIGGERED, function(event,value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.get_bluetooth_status=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BLE).getBluetoothStatus()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.bluetooth_sent=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BLE)\n"+".trigger(MixIO.actionTags.BLUETOOTH_SENT,"+message+")\n"
  return code; 
};

Blockly.JavaScript.camera_sent=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.CAMERA)\n"+".bind(MixIO.eventTags.CAMERA_SENT, function(event,value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.mic_sent=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.MIC)\n"+".bind(MixIO.eventTags.MIC_SENT, function(event,value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.select_sent=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.SELECT)\n"+".bind(MixIO.eventTags.SELECT_SENT, function(event,value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.lineChart_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.LINE_CHART)\n"+".trigger(MixIO.actionTags.LINE_CHART_CHANGE,"+message+")\n"
  return code; 
};

Blockly.JavaScript.clear_lineChart=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.LINE_CHART)\n"+".trigger(MixIO.actionTags.LINE_CHART_CLEAR)\n"
  return code; 
};

Blockly.JavaScript.get_all_messages=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.LINE_CHART).getAllMessages()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.get_N_messages=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var num = Blockly.JavaScript.valueToCode(this, 'num', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.LINE_CHART).getLatestMessages("+num+")"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.get_latest_message=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.LINE_CHART).getLatestMessage()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.barChart_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BAR_CHART)\n"+".bind(MixIO.eventTags.BAR_CHART_CHANGED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.barChart_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BAR_CHART)\n"+".trigger(MixIO.actionTags.BAR_CHART_CHANGE,"+message+")\n"
  return code; 
};

Blockly.JavaScript.clear_barChart=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BAR_CHART)\n"+".trigger(MixIO.actionTags.BAR_CHART_CLEAR)\n"
  return code; 
};

Blockly.JavaScript.get_now_messages=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BAR_CHART).getData()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.datasheet_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DATA_TABLE)\n"+".bind(MixIO.eventTags.DATA_TABLE_CHANGED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.datasheet_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message=Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  message = '['+message+']';
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DATA_TABLE)\n"+".trigger(MixIO.actionTags.DATA_TABLE_CHANGE,"+message+")\n"
  return code; 
};

Blockly.JavaScript.clear_datasheet=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DATA_TABLE)\n"+".trigger(MixIO.actionTags.DATA_TABLE_CLEAR)\n"
  return code; 
};

Blockly.JavaScript.get_datasheet_all_messages=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DATA_TABLE).getData()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dashboard_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DASHBOARD)\n"+".bind(MixIO.eventTags.DASHBOARD_CHANGED, function(event,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.dashboard_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DASHBOARD)\n"+".trigger(MixIO.actionTags.DASHBOARD_CHANGE,"+message+")\n"
  return code; 
};

Blockly.JavaScript.get_dashboard_now_messages=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DASHBOARD).getValue()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript.datamap_recieved=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DATA_MAP)\n"+".bind(MixIO.eventTags.DATA_MAP_CHANGED, function(event,clientid,long,lat,message){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.face_recognized =function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.FACE)\n"+".bind(MixIO.eventTags.FACE_RECOGNIZED, function(event,id,status,faceName,isMouthOpen,faceProbability,happy,sad,angry,surprised,disgusted,fearful){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.datamap_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var long = Blockly.JavaScript.valueToCode(this, 'long', Blockly.JavaScript.ORDER_ATOMIC);
  var lat = Blockly.JavaScript.valueToCode(this, 'lat', Blockly.JavaScript.ORDER_ATOMIC);
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DATA_MAP)\n"+".trigger(MixIO.actionTags.DATA_MAP_CHANGE,{\n"
  +"\tclientid:MixIO.getClientid(),\n"+"\tlong:"+long+",\n"+"\tlat:"+lat+",\n"+"\tmessage:"+message+"\n})\n"
  return code; 
};

Blockly.JavaScript.clear_datamap=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.DATA_MAP)\n"+".trigger(MixIO.actionTags.DATA_MAP_CLEAR)\n"
  return code; 
};

Blockly.JavaScript.clear_pixel=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.PIXEL)\n"+".clearPixel()\n"
  return code; 
};

Blockly.JavaScript.ws_updated=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.WEATHER)\n"+".bind(MixIO.eventTags.WEATHER_SYNCED, function(event,district,weather_type,temperature,humidity,wind_dir,wind_class){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.ws_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.WEATHER)\n"+".bind(MixIO.eventTags.WEATHER_SENT, function(event,district,weather_type,temperature,humidity,wind_dir,wind_class){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.let_ws_update=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.WEATHER)\n"+".trigger(MixIO.actionTags.WEATHER_SYNC)\n"
  return code; 
};

Blockly.JavaScript.let_ws_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.WEATHER)\n"+".trigger(MixIO.actionTags.WEATHER_SEND)\n"
  return code; 
};

Blockly.JavaScript.get_ws_para=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var message = this.getFieldValue('message');
  var code="MixIO.getInstance("+name+",MixIO.typeTags.WEATHER)"+".getData("+message+")"
  return [code,Blockly.JavaScript.ORDER_ATOMIC]; 
};


Blockly.JavaScript.dicts_create_with = function() {
  // Create a list with any number of elements of any type.
  //var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
    Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  var default_value = '0';
  


  for (var n = 0; n < this.itemCount_; n++) {

  var keyName = this.getFieldValue('KEY' + n);
    
  code[n] = keyName+":"+(Blockly.JavaScript.valueToCode(this, 'ADD' + n, Blockly.JavaScript.ORDER_NONE) || default_value);
  }
  var code = "var "+varName+'= '+ '{' + code.join(', ') + '}\n';
  //var code =''+varName+'['+size+"]"+'='+ '{' + code.join(', ') + '};\n';
  //Blockly.JavaScript.setups_['setup_lists'+varName] = code;
  return code;
};



Blockly.JavaScript.dicts_keys = function() {
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code='Object.keys('+varName+')';
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dicts_get = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text = Blockly.JavaScript.valueToCode(this, 'KEY', Blockly.JavaScript.ORDER_ASSIGNMENT);
  // var text=this.getFieldValue('KEY');
  var code = varName+"[" + text + "]";
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dicts_get_default = function() {
  var dropdown_type = this.getFieldValue('TYPE');
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var text = Blockly.JavaScript.valueToCode(this, 'KEY', Blockly.JavaScript.ORDER_ASSIGNMENT);
  var argument = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  // var text=this.getFieldValue('KEY');
  var code = varName+".get(" + text + ',' + argument + ")";
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dicts_add_or_change = function(){
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || 'mydict';
  var text = Blockly.JavaScript.valueToCode(this, 'KEY', Blockly.JavaScript.ORDER_ASSIGNMENT);
  // var text=this.getFieldValue('KEY');
  var argument = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code=varName + "["  + text + "] = " + argument+'\n';
  return code;
};

Blockly.JavaScript.dicts_delete = function() {
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || 'mydict';
  var text = Blockly.JavaScript.valueToCode(this, 'KEY', Blockly.JavaScript.ORDER_ASSIGNMENT);
  // var text=this.getFieldValue('KEY');
  var code= "delete "+ varName+"[" + text + "]\n";
  return code;
};

Blockly.JavaScript.dicts_update = function() {
 var varName2 = Blockly.JavaScript.valueToCode(this, 'DICT2', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code=varName+'.update(' + varName2 +')\n';
  return code;
};

Blockly.JavaScript.dicts_clear = function() {
 var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code=varName+' = {}\n';
  return code;
};

Blockly.JavaScript.dicts_items = function() {
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code=varName+'.items()';
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dicts_values = function() {
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code='Object.values('+varName+')';
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dicts_length = function() {
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code=varName + '.length';
  return [code,Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dicts_deldict = function() {
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code='delete ' + varName + '\n';
  return code;
};

Blockly.JavaScript.dicts_add_change_del = function(block){
  var dict = Blockly.JavaScript.valueToCode(block, 'DICT',
      Blockly.JavaScript.ORDER_MEMBER) || '[]';
  var mode = block.getFieldValue('WHERE');
  var where = block.getFieldValue('OP');
  var KEY = Blockly.JavaScript.valueToCode(this, 'KEY', Blockly.JavaScript.ORDER_ASSIGNMENT);
  // var text=this.getFieldValue('KEY');
  
  

  switch (mode) {
    case 'INSERT':
      //var at2 = block.getFieldValue('AT2');
      var at2 = Blockly.JavaScript.valueToCode(this, 'AT2', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
      var code = dict + "["  + KEY + "] = " + at2 + '\n'
      break;
    
    case 'DELETE':
      var code = 'del ' + dict + "["  + KEY + "]\n"
      break;
    default:
      throw 'Unhandled option (lists_setIndex2)';
  }
  return code;
};

Blockly.JavaScript.dicts_pop = function(){
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var text = Blockly.JavaScript.valueToCode(this, 'KEY', Blockly.JavaScript.ORDER_ASSIGNMENT);
  // var text=this.getFieldValue('KEY');
  var code=varName + ".pop("  + text + ")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
}


Blockly.JavaScript.dicts_setdefault = function() {
  var varName = Blockly.JavaScript.valueToCode(this, 'DICT', Blockly.JavaScript.ORDER_ASSIGNMENT) || 'mydict';
  var text = Blockly.JavaScript.valueToCode(this, 'KEY', Blockly.JavaScript.ORDER_ASSIGNMENT);
  // var text=this.getFieldValue('KEY');
  var argument = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
  var code= varName + ".setdefault"+ "(" + text + "," + argument + ")\n";
  return code;
};

Blockly.JavaScript.dicts_create_with_noreturn = function() {
  // Create a list with any number of elements of any type.
  // var varName = Blockly.JavaScript.variableDB_.getName(this.getFieldValue('VAR'),
  //  Blockly.Variables.NAME_TYPE);
  //var size=window.parseFloat(this.getFieldValue('SIZE'));
  var code = new Array(this.itemCount_);
  var default_value = '0';

  for (var n = 0; n < this.itemCount_; n++) {
    var keyName = this.getFieldValue('KEY' + n);
    code[n] = keyName+":"+(Blockly.JavaScript.valueToCode(this, 'ADD' + n, Blockly.JavaScript.ORDER_NONE) || default_value);
  }
 // if (this.itemCount_!=1){
//  Blockly.JavaScript.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ')\n';}
 // else {
 // Blockly.JavaScript.definitions_['var_declare'+varName] = varName+'= '+ '(' + code.join(', ') + ',)\n';}
 if (this.itemCount_!=1){
  var code = '{' + code.join(', ') + '}';}
 else {
  var code = '{' + code.join(', ') + ',}';}

  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.dicts_todict = function() {  
  var str = Blockly.JavaScript.valueToCode(this, 'VAR', Blockly.JavaScript.ORDER_ATOMIC) || '0'
  return ['dict('+str+')', Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.log_message=function(block) {
  var message = Blockly.JavaScript.valueToCode(this, 'message', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.log("+message+")\n";
  return code;
};


Blockly.JavaScript.setInterval=function(block) {
  var time = Blockly.JavaScript.valueToCode(this, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_code=Blockly.JavaScript.statementToCode(block, "DO0" );
  var code="MixIO.setInterval(function(){\n"+statement_code+"},"+time+")\n";
  return code;
};

Blockly.JavaScript.setTimeout=function(block) {
  var time = Blockly.JavaScript.valueToCode(this, 'time', Blockly.JavaScript.ORDER_ATOMIC);
  var statement_code=Blockly.JavaScript.statementToCode(block, "DO0" );
  var code="MixIO.setTimeout(function(){\n"+statement_code+"},"+time+")\n";
  return code;
};

Blockly.JavaScript.current_time=function(block) {
  var code="Date.now()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.current_time_string=function(block) {
  var code="Date().toLocaleString()"
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};


Blockly.JavaScript.math_parse_int=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="parseInt("+name+")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.math_parse_float=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="parseFloat("+name+")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.get_long=function(block) {
  var code="MixIO.getLong()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};
Blockly.JavaScript.get_lati=function(block) {
  var code="MixIO.getLati()";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.json2text=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="JSON.stringify("+name+")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.text2json=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="JSON.parse("+name+")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.get_accessToken = function(block) {
  MixIO.get_accessToken = function(client_id,client_secret){
      var accessToken = undefined;
      $.ajax({
          type: 'POST',
          url: 'proxy',
          async: false,
          data: {
              'url': 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id='+client_id+'&client_secret='+client_secret+'',
              'data':{
              }
          },
          success: function(data) {
              accessToken = data.access_token;
          },
          error: function(xhr, type) {
              MixIO.log(xhr);
          }
      });
      return accessToken;
  }

  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var name2 = Blockly.JavaScript.valueToCode(this, 'name2', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.get_accessToken("+name+","+name2+")";
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript.translate = function(block) {
  MixIO.translate = function(access_token, query, to, func){
      var result = undefined;
      $.ajax({
          type: 'POST',
          url: 'proxy',
          data: {
              'url': 'https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token='+access_token+'',
              'data':{
                  "from":"auto",
                  "to":to,
                  "q":query
              }
          },
          success: function(data) {
              func(data)
          },
          error: function(xhr, type) {
              MixIO.log(xhr);
          }
      });
  }

  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var name2 = Blockly.JavaScript.valueToCode(this, 'name2', Blockly.JavaScript.ORDER_ATOMIC);
  var name3 = Blockly.JavaScript.valueToCode(this, 'name3', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.translate("+name+","+name2+","+name3+")";
  var code="MixIO.translate("+name+","+name2+","+name3+",function(result){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.chat = function(block) {
  MixIO.chat = function(access_token, message, history, func){
      var result = undefined;
      var allMessages = history;
      allMessages.push({
          "role": "user",
          "content": message
      })
      $.ajax({
          type: 'POST',
          url: 'proxy',
          data: {
              'url': 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token='+access_token+'',
              'data':{
                  "messages":allMessages
              }
          },
          success: function(data) {
              func(data)
          },
          error: function(xhr, type) {
              MixIO.log(xhr);
          }
      });
  }

  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var name2 = Blockly.JavaScript.valueToCode(this, 'name2', Blockly.JavaScript.ORDER_ATOMIC);
  var name3 = "[]";
  var code="MixIO.chat("+name+","+name2+","+name3+")";
  var code="MixIO.chat("+name+","+name2+","+name3+",function(result){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

// This file was automatically generated.  Do not modify.

'use strict';

Blockly.Msg["ALERT_MESSAGE"] = "通知发布";
Blockly.Msg["ADD_COMMENT"] = "添加注释";
Blockly.Msg["CANNOT_DELETE_VARIABLE_PROCEDURE"] = "不能删除变量“%1”，因为它是函数“%2”定义的一部分";
Blockly.Msg["CHANGE_VALUE_TITLE"] = "更改值：";
Blockly.Msg["CLEAN_UP"] = "整理块";
Blockly.Msg["COLLAPSED_WARNINGS_WARNING"] = "已收起的信息块内包含警告。";
Blockly.Msg["COLLAPSE_ALL"] = "折叠块";
Blockly.Msg["COLLAPSE_BLOCK"] = "折叠块";
Blockly.Msg["COLOUR_BLEND_COLOUR1"] = "颜色1";
Blockly.Msg["COLOUR_BLEND_COLOUR2"] = "颜色2";
Blockly.Msg["COLOUR_BLEND_HELPURL"] = "https://meyerweb.com/eric/tools/color-blend/#:::rgbp";  // untranslated
Blockly.Msg["COLOUR_BLEND_RATIO"] = "比例";
Blockly.Msg["COLOUR_BLEND_TITLE"] = "混合";
Blockly.Msg["COLOUR_BLEND_TOOLTIP"] = "把两种颜色以一个给定的比例(0.0-1.0)进行混合。";
Blockly.Msg["COLOUR_PICKER_HELPURL"] = "https://zh.wikipedia.org/wiki/颜色";
Blockly.Msg["COLOUR_PICKER_TOOLTIP"] = "从调色板中选择一种颜色。";
Blockly.Msg["COLOUR_RANDOM_HELPURL"] = "http://randomcolour.com";  // untranslated
Blockly.Msg["COLOUR_RANDOM_TITLE"] = "随机颜色";
Blockly.Msg["COLOUR_RANDOM_TOOLTIP"] = "随机选择一种颜色。";
Blockly.Msg["COLOUR_RGB_BLUE"] = "蓝色";
Blockly.Msg["COLOUR_RGB_GREEN"] = "绿色";
Blockly.Msg["COLOUR_RGB_HELPURL"] = "https://www.december.com/html/spec/colorpercompact.html";  // untranslated
Blockly.Msg["COLOUR_RGB_RED"] = "红色";
Blockly.Msg["COLOUR_RGB_TITLE"] = "颜色";
Blockly.Msg["COLOUR_RGB_TOOLTIP"] = "通过指定红色、绿色和蓝色的量创建一种颜色。所有的值必须在0和100之间。";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#loop-termination-blocks";  // untranslated
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK"] = "跳出循环";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE"] = "继续下一轮循环";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK"] = "跳出包含它的循环。";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE"] = "跳过本轮循环的剩余部分，并继进行续下一轮循环。";
Blockly.Msg["CONTROLS_FLOW_STATEMENTS_WARNING"] = "警告：这个块只能在循环内使用。";
Blockly.Msg["CONTROLS_FOREACH_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#for-each";  // untranslated
Blockly.Msg["CONTROLS_FOREACH_TITLE"] = "遍历列表 %2 里的每一项 %1";
Blockly.Msg["CONTROLS_FOREACH_TOOLTIP"] = "遍历列表中的每一项，将变量“%1”设为所选项，并执行一些语句。";
Blockly.Msg["CONTROLS_FOR_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#count-with";  // untranslated
Blockly.Msg["CONTROLS_FOR_TITLE"] = "变量 %1 从 %2 数到 %3 每次增加 %4";
Blockly.Msg["CONTROLS_FOR_TOOLTIP"] = "用变量%1记录从开始数值到终止数值之间的数值，数值按指定间隔增加，并执行指定的块。";
Blockly.Msg["CONTROLS_IF_ELSEIF_TOOLTIP"] = "在这个if语句块中增加一个条件。";
Blockly.Msg["CONTROLS_IF_ELSE_TOOLTIP"] = "在这个if语句块中添加一个最终的，包括所有其余情况的条件。";
Blockly.Msg["CONTROLS_IF_HELPURL"] = "https://github.com/google/blockly/wiki/IfElse";  // untranslated
Blockly.Msg["CONTROLS_IF_IF_TOOLTIP"] = "增加、删除或重新排列各节来重新配置这个if语句块。";
Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "否则";
Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"] = "否则如果";
Blockly.Msg["CONTROLS_IF_MSG_IF"] = "如果";
Blockly.Msg["CONTROLS_IF_TOOLTIP_1"] = "如果值为真，执行一些语句。";
Blockly.Msg["CONTROLS_IF_TOOLTIP_2"] = "如果值为真，则执行第一块语句。否则，则执行第二块语句。";
Blockly.Msg["CONTROLS_IF_TOOLTIP_3"] = "如果第一个值为真，则执行第一块的语句。否则，如果第二个值为真，则执行第二块的语句。";
Blockly.Msg["CONTROLS_IF_TOOLTIP_4"] = "如果第一个值为真，则执行第一块对语句。否则，如果第二个值为真，则执行语句的第二块。如果没有值为真，则执行最后一块的语句。";
Blockly.Msg["CONTROLS_REPEAT_HELPURL"] = "https://zh.wikipedia.org/wiki/For循环";
Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "执行";
Blockly.Msg["CONTROLS_REPEAT_TITLE"] = "重复 %1 次";
Blockly.Msg["CONTROLS_REPEAT_TOOLTIP"] = "多次执行一些语句。";
Blockly.Msg["CONTROLS_WHILEUNTIL_HELPURL"] = "https://github.com/google/blockly/wiki/Loops#repeat";  // untranslated
Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_UNTIL"] = "重复直到条件满足";
Blockly.Msg["CONTROLS_WHILEUNTIL_OPERATOR_WHILE"] = "当条件满足时重复";
Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL"] = "只要值为假，就一直循环执行一些语句。";
Blockly.Msg["CONTROLS_WHILEUNTIL_TOOLTIP_WHILE"] = "只要值为真，就一直循环执行一些语句。";
Blockly.Msg["DELETE_ALL_BLOCKS"] = "删除所有 %1 个块吗？";
Blockly.Msg["DELETE_BLOCK"] = "删除块";
Blockly.Msg["DELETE_VARIABLE"] = "删除变量“%1”";
Blockly.Msg["DELETE_VARIABLE_CONFIRMATION"] = "要删除对变量“%2”的%1个引用吗？";
Blockly.Msg["DELETE_X_BLOCKS"] = "删除 %1 个块";
Blockly.Msg["DIALOG_CANCEL"] = "取消";
Blockly.Msg["DIALOG_OK"] = "确认";
Blockly.Msg["DISABLE_BLOCK"] = "禁用块";
Blockly.Msg["DUPLICATE_BLOCK"] = "复制";
Blockly.Msg["DUPLICATE_COMMENT"] = "复制注释";
Blockly.Msg["ENABLE_BLOCK"] = "启用块";
Blockly.Msg["EXPAND_ALL"] = "展开块";
Blockly.Msg["EXPAND_BLOCK"] = "展开块";
Blockly.Msg["EXTERNAL_INPUTS"] = "外部输入";
Blockly.Msg["HELP"] = "帮助";
Blockly.Msg["INLINE_INPUTS"] = "单行输入";
Blockly.Msg["LISTS_CREATE_EMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-empty-list";
Blockly.Msg["LISTS_CREATE_EMPTY_TITLE"] = "创建空列表";
Blockly.Msg["LISTS_CREATE_EMPTY_TOOLTIP"] = "返回一个列表，长度为 0，不包含任何数据记录";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TITLE_ADD"] = "列表";
Blockly.Msg["LISTS_CREATE_WITH_CONTAINER_TOOLTIP"] = "增加、删除或重新排列各部分以此重新配置这个列表块。";
Blockly.Msg["LISTS_CREATE_WITH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";
Blockly.Msg["LISTS_CREATE_WITH_INPUT_WITH"] = "创建列表，内容：";
Blockly.Msg["LISTS_CREATE_WITH_ITEM_TOOLTIP"] = "将一个项添加到列表中。";
Blockly.Msg["LISTS_CREATE_WITH_TOOLTIP"] = "建立一个具有任意数量项目的列表。";
Blockly.Msg["LISTS_GET_INDEX_FIRST"] = "第一项";
Blockly.Msg["LISTS_GET_INDEX_FROM_END"] = "倒数第#项";
Blockly.Msg["LISTS_GET_INDEX_FROM_START"] = "#";
Blockly.Msg["LISTS_GET_INDEX_GET"] = "取得";
Blockly.Msg["LISTS_GET_INDEX_GET_REMOVE"] = "取得并移除";
Blockly.Msg["LISTS_GET_INDEX_LAST"] = "最后一项";
Blockly.Msg["LISTS_GET_INDEX_RANDOM"] = "随机的一项";
Blockly.Msg["LISTS_GET_INDEX_REMOVE"] = "移除";
Blockly.Msg["LISTS_GET_INDEX_TAIL"] = "-";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FIRST"] = "返回列表中的第一项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_FROM"] = "返回在列表中的指定位置的项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_LAST"] = "返回列表中的最后一项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_RANDOM"] = "返回列表中的随机一项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST"] = "移除并返回列表中的第一项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM"] = "移除并返回列表中的指定位置的项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST"] = "移除并返回列表中的最后一项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM"] = "移除并返回列表中的随机一项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST"] = "移除列表中的第一项";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM"] = "移除在列表中的指定位置的项。";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST"] = "移除列表中的最后一项";
Blockly.Msg["LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM"] = "删除列表中的随机一项。";
Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_END"] = "到倒数第#项";
Blockly.Msg["LISTS_GET_SUBLIST_END_FROM_START"] = "到第#项";
Blockly.Msg["LISTS_GET_SUBLIST_END_LAST"] = "到最后一项";
Blockly.Msg["LISTS_GET_SUBLIST_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-a-sublist";  // untranslated
Blockly.Msg["LISTS_GET_SUBLIST_START_FIRST"] = "获取子列表，从第一项";
Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_END"] = "获取子列表，从倒数第#项";
Blockly.Msg["LISTS_GET_SUBLIST_START_FROM_START"] = "获取子列表，从第#项";
Blockly.Msg["LISTS_GET_SUBLIST_TAIL"] = "-";
Blockly.Msg["LISTS_GET_SUBLIST_TOOLTIP"] = "复制列表中指定的部分。";
Blockly.Msg["LISTS_INDEX_FROM_END_TOOLTIP"] = "%1是最后一项。";
Blockly.Msg["LISTS_INDEX_FROM_START_TOOLTIP"] = "%1是第一项。";
Blockly.Msg["LISTS_INDEX_OF_FIRST"] = "寻找第一次出现的项";
Blockly.Msg["LISTS_INDEX_OF_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#getting-items-from-a-list";  // untranslated
Blockly.Msg["LISTS_INDEX_OF_LAST"] = "寻找最后一次出现的项";
Blockly.Msg["LISTS_INDEX_OF_TOOLTIP"] = "返回在列表中的第一/最后一个匹配项的索引值。如果找不到项目则返回%1。";
Blockly.Msg["LISTS_INLIST"] = "在列表中";
Blockly.Msg["LISTS_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#is-empty";  // untranslated
Blockly.Msg["LISTS_ISEMPTY_TITLE"] = "%1是空的";
Blockly.Msg["LISTS_ISEMPTY_TOOLTIP"] = "如果改列表为空，则返回真。";
Blockly.Msg["LISTS_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#length-of";  // untranslated
Blockly.Msg["LISTS_LENGTH_TITLE"] = "%1的长度";
Blockly.Msg["LISTS_LENGTH_TOOLTIP"] = "返回列表的长度。";
Blockly.Msg["LISTS_REPEAT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#create-list-with";  // untranslated
Blockly.Msg["LISTS_REPEAT_TITLE"] = "建立列表使用项 %1 重复 %2 次";
Blockly.Msg["LISTS_REPEAT_TOOLTIP"] = "建立包含指定重复次数的值的列表。";
Blockly.Msg["LISTS_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#reversing-a-list";
Blockly.Msg["LISTS_REVERSE_MESSAGE0"] = "倒转%1";
Blockly.Msg["LISTS_REVERSE_TOOLTIP"] = "倒转一个列表，返回副本。";
Blockly.Msg["LISTS_SET_INDEX_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#in-list--set";  // untranslated
Blockly.Msg["LISTS_SET_INDEX_INPUT_TO"] = "值为";
Blockly.Msg["LISTS_SET_INDEX_INSERT"] = "插入在";
Blockly.Msg["LISTS_SET_INDEX_SET"] = "设置";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST"] = "在列表的起始处添加该项。";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_FROM"] = "在列表中指定位置插入项。";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_LAST"] = "在列表的末尾处添加该项。";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM"] = "在列表的随机位置插入该项。";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FIRST"] = "设置列表中的第一项。";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_FROM"] = "设置在列表中指定位置的项。";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_LAST"] = "设置列表中的最后一项。";
Blockly.Msg["LISTS_SET_INDEX_TOOLTIP_SET_RANDOM"] = "设置列表中的随机一项。";
Blockly.Msg["LISTS_SORT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#sorting-a-list";
Blockly.Msg["LISTS_SORT_ORDER_ASCENDING"] = "升序";
Blockly.Msg["LISTS_SORT_ORDER_DESCENDING"] = "降序";
Blockly.Msg["LISTS_SORT_TITLE"] = "排序%1 %2 %3";
Blockly.Msg["LISTS_SORT_TOOLTIP"] = "排序一个列表，返回副本。";
Blockly.Msg["LISTS_SORT_TYPE_IGNORECASE"] = "按字母（忽略大小写）";
Blockly.Msg["LISTS_SORT_TYPE_NUMERIC"] = "按数字";
Blockly.Msg["LISTS_SORT_TYPE_TEXT"] = "按字母";
Blockly.Msg["LISTS_SPLIT_HELPURL"] = "https://github.com/google/blockly/wiki/Lists#splitting-strings-and-joining-lists";
Blockly.Msg["LISTS_SPLIT_LIST_FROM_TEXT"] = "从文本制作列表";
Blockly.Msg["LISTS_SPLIT_TEXT_FROM_LIST"] = "将列表合并为文本";
Blockly.Msg["LISTS_SPLIT_TOOLTIP_JOIN"] = "加入文本列表至一个文本，由分隔符分隔。";
Blockly.Msg["LISTS_SPLIT_TOOLTIP_SPLIT"] = "将文本按指定的分隔符拆分为文本组成的列表。";
Blockly.Msg["LISTS_SPLIT_WITH_DELIMITER"] = "分隔符：";
Blockly.Msg["LOGIC_BOOLEAN_FALSE"] = "假";
Blockly.Msg["LOGIC_BOOLEAN_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#values";  // untranslated
Blockly.Msg["LOGIC_BOOLEAN_TOOLTIP"] = "返回真或假。";
Blockly.Msg["LOGIC_BOOLEAN_TRUE"] = "真";
Blockly.Msg["LOGIC_COMPARE_HELPURL"] = "https://zh.wikipedia.org/wiki/不等";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_EQ"] = "如果两个输入结果相等，则返回真。";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GT"] = "如果第一个输入结果比第二个大，则返回真。";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_GTE"] = "如果第一个输入结果大于或等于第二个输入结果，则返回真。";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LT"] = "如果第一个输入结果比第二个小，则返回真。";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_LTE"] = "如果第一个输入结果小于或等于第二个输入结果，则返回真。";
Blockly.Msg["LOGIC_COMPARE_TOOLTIP_NEQ"] = "如果两个输入结果不相等，则返回真。";
Blockly.Msg["LOGIC_NEGATE_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#not";
Blockly.Msg["LOGIC_NEGATE_TITLE"] = "%1不成立";
Blockly.Msg["LOGIC_NEGATE_TOOLTIP"] = "如果输入结果为假，则返回真；如果输入结果为真，则返回假。";
Blockly.Msg["LOGIC_NULL"] = "空";
Blockly.Msg["LOGIC_NULL_HELPURL"] = "https://en.wikipedia.org/wiki/Nullable_type";  // untranslated
Blockly.Msg["LOGIC_NULL_TOOLTIP"] = "返回空值。";
Blockly.Msg["LOGIC_OPERATION_AND"] = "并且";
Blockly.Msg["LOGIC_OPERATION_HELPURL"] = "https://github.com/google/blockly/wiki/Logic#logical-operations";  // untranslated
Blockly.Msg["LOGIC_OPERATION_OR"] = "或";
Blockly.Msg["LOGIC_OPERATION_TOOLTIP_AND"] = "如果两个输入结果都为真，则返回真。";
Blockly.Msg["LOGIC_OPERATION_TOOLTIP_OR"] = "如果至少有一个输入结果为真，则返回真。";
Blockly.Msg["LOGIC_TERNARY_CONDITION"] = "断言";
Blockly.Msg["LOGIC_TERNARY_HELPURL"] = "https://zh.wikipedia.org/wiki/条件运算符";
Blockly.Msg["LOGIC_TERNARY_IF_FALSE"] = "如果为假";
Blockly.Msg["LOGIC_TERNARY_IF_TRUE"] = "如果为真";
Blockly.Msg["LOGIC_TERNARY_TOOLTIP"] = "检查“断言”里的条件语句。如果条件为真，则返回“如果为真”的值，否则，则返回“如果为假”的值。";
Blockly.Msg["MATH_ADDITION_SYMBOL"] = "+";  // untranslated
Blockly.Msg["MATH_ARITHMETIC_HELPURL"] = "https://zh.wikipedia.org/wiki/算术";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_ADD"] = "返回两个数值的和。";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_DIVIDE"] = "返回两个数值的商。";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MINUS"] = "返回两个数值的差。";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_MULTIPLY"] = "返回两个数值的乘积。";
Blockly.Msg["MATH_ARITHMETIC_TOOLTIP_POWER"] = "返回以第一个数值为底数，以第二个数值为幂的结果。";
Blockly.Msg["MATH_ATAN2_HELPURL"] = "https://zh.wikipedia.org/wiki/反正切2";
Blockly.Msg["MATH_ATAN2_TITLE"] = "点(x:%1,y:%2)的方位角";
Blockly.Msg["MATH_ATAN2_TOOLTIP"] = "返回点（X，Y）的反正切值，范围为-180到180度。";
Blockly.Msg["MATH_CHANGE_HELPURL"] = "https://zh.wikipedia.org/wiki/加法";
Blockly.Msg["MATH_CHANGE_TITLE"] = "将 %1 增加 %2";
Blockly.Msg["MATH_CHANGE_TOOLTIP"] = "为变量“%1”增加一个数值。";
Blockly.Msg["MATH_CONSTANT_HELPURL"] = "https://zh.wikipedia.org/wiki/数学常数";
Blockly.Msg["MATH_CONSTANT_TOOLTIP"] = "返回一个常见常量：π (3.141…)、e (2.718…)、φ (1.618…)、根号2 (1.414…)、根号二分之一 (0.707…)或∞ (无穷大)。";
Blockly.Msg["MATH_CONSTRAIN_HELPURL"] = "https://en.wikipedia.org/wiki/Clamping_(graphics)";  // untranslated
Blockly.Msg["MATH_CONSTRAIN_TITLE"] = "将 %1 限制在 最低 %2 到最高 %3 之间";
Blockly.Msg["MATH_CONSTRAIN_TOOLTIP"] = "将一个数值限制在两个指定的数值范围（含边界）之间。";
Blockly.Msg["MATH_DIVISION_SYMBOL"] = "÷";  // untranslated
Blockly.Msg["MATH_IS_DIVISIBLE_BY"] = "可被整除";
Blockly.Msg["MATH_IS_EVEN"] = "是偶数";
Blockly.Msg["MATH_IS_NEGATIVE"] = "是负数";
Blockly.Msg["MATH_IS_ODD"] = "是奇数";
Blockly.Msg["MATH_IS_POSITIVE"] = "是正数";
Blockly.Msg["MATH_IS_PRIME"] = "是质数";
Blockly.Msg["MATH_IS_TOOLTIP"] = "检查一个数值是否是偶数、奇数、质数、自然数、正数、负数或者是否能被某数整除。返回真或假。";
Blockly.Msg["MATH_IS_WHOLE"] = "是整数";
Blockly.Msg["MATH_MODULO_HELPURL"] = "https://zh.wikipedia.org/wiki/模除";
Blockly.Msg["MATH_MODULO_TITLE"] = "取 %1 ÷ %2 的余数";
Blockly.Msg["MATH_MODULO_TOOLTIP"] = "返回这两个数字相除后的余数。";
Blockly.Msg["MATH_MULTIPLICATION_SYMBOL"] = "×";  // untranslated
Blockly.Msg["MATH_NUMBER_HELPURL"] = "https://zh.wikipedia.org/wiki/数";
Blockly.Msg["MATH_NUMBER_TOOLTIP"] = "一个数值。";
Blockly.Msg["MATH_ONLIST_HELPURL"] = "";  // untranslated
Blockly.Msg["MATH_ONLIST_OPERATOR_AVERAGE"] = "列表平均值";
Blockly.Msg["MATH_ONLIST_OPERATOR_MAX"] = "列表最大值";
Blockly.Msg["MATH_ONLIST_OPERATOR_MEDIAN"] = "列表中位数";
Blockly.Msg["MATH_ONLIST_OPERATOR_MIN"] = "列表最小值";
Blockly.Msg["MATH_ONLIST_OPERATOR_MODE"] = "列表中的众数";
Blockly.Msg["MATH_ONLIST_OPERATOR_RANDOM"] = "列表中的随机一项";
Blockly.Msg["MATH_ONLIST_OPERATOR_STD_DEV"] = "列表的标准差";
Blockly.Msg["MATH_ONLIST_OPERATOR_SUM"] = "列表中数值的和";
Blockly.Msg["MATH_ONLIST_TOOLTIP_AVERAGE"] = "返回列表中的数值的平均值。";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MAX"] = "返回列表中最大值。";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MEDIAN"] = "返回列表中数值的中位数。";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MIN"] = "返回列表中最小值。";
Blockly.Msg["MATH_ONLIST_TOOLTIP_MODE"] = "返回列表中的出现次数最多的项的列表。";
Blockly.Msg["MATH_ONLIST_TOOLTIP_RANDOM"] = "从列表中返回一个随机的元素。";
Blockly.Msg["MATH_ONLIST_TOOLTIP_STD_DEV"] = "返回列表的标准差。";
Blockly.Msg["MATH_ONLIST_TOOLTIP_SUM"] = "返回列表中的所有数值的和。";
Blockly.Msg["MATH_POWER_SYMBOL"] = "^";  // untranslated
Blockly.Msg["MATH_RANDOM_FLOAT_HELPURL"] = "https://zh.wikipedia.org/wiki/随机数生成器";
Blockly.Msg["MATH_RANDOM_FLOAT_TITLE_RANDOM"] = "随机小数";
Blockly.Msg["MATH_RANDOM_FLOAT_TOOLTIP"] = "返回一个从0.0（含）到1.0（不含）之间的随机数。";
Blockly.Msg["MATH_RANDOM_INT_HELPURL"] = "https://zh.wikipedia.org/wiki/随机数生成器";
Blockly.Msg["MATH_RANDOM_INT_TITLE"] = "从 %1 到 %2 范围内的随机整数";
Blockly.Msg["MATH_RANDOM_INT_TOOLTIP"] = "返回一个限制在两个指定数值的范围（含边界）之间的随机整数。";
Blockly.Msg["MATH_ROUND_HELPURL"] = "https://zh.wikipedia.org/wiki/数值修约";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUND"] = "四舍五入";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDDOWN"] = "向下舍入";
Blockly.Msg["MATH_ROUND_OPERATOR_ROUNDUP"] = "向上舍入";
Blockly.Msg["MATH_ROUND_TOOLTIP"] = "数字向上或向下舍入。";
Blockly.Msg["MATH_SINGLE_HELPURL"] = "https://zh.wikipedia.org/wiki/平方根";
Blockly.Msg["MATH_SINGLE_OP_ABSOLUTE"] = "绝对值";
Blockly.Msg["MATH_SINGLE_OP_ROOT"] = "平方根";
Blockly.Msg["MATH_SINGLE_TOOLTIP_ABS"] = "返回一个数值的绝对值。";
Blockly.Msg["MATH_SINGLE_TOOLTIP_EXP"] = "返回一个数值的e次幂。";
Blockly.Msg["MATH_SINGLE_TOOLTIP_LN"] = "返回一个数值的自然对数。";
Blockly.Msg["MATH_SINGLE_TOOLTIP_LOG10"] = "返回一个数值的以10为底的对数。";
Blockly.Msg["MATH_SINGLE_TOOLTIP_NEG"] = "返回一个数值的相反数。";
Blockly.Msg["MATH_SINGLE_TOOLTIP_POW10"] = "返回一个数值的10次幂。";
Blockly.Msg["MATH_SINGLE_TOOLTIP_ROOT"] = "返回一个数的平方根。";
Blockly.Msg["MATH_SUBTRACTION_SYMBOL"] = "-";  // untranslated
Blockly.Msg["MATH_TRIG_ACOS"] = "acos";  // untranslated
Blockly.Msg["MATH_TRIG_ASIN"] = "asin";  // untranslated
Blockly.Msg["MATH_TRIG_ATAN"] = "atan";  // untranslated
Blockly.Msg["MATH_TRIG_COS"] = "cos";  // untranslated
Blockly.Msg["MATH_TRIG_HELPURL"] = "https://zh.wikipedia.org/wiki/三角函数";
Blockly.Msg["MATH_TRIG_SIN"] = "sin";  // untranslated
Blockly.Msg["MATH_TRIG_TAN"] = "tan";  // untranslated
Blockly.Msg["MATH_TRIG_TOOLTIP_ACOS"] = "返回一个数值的反余弦值。";
Blockly.Msg["MATH_TRIG_TOOLTIP_ASIN"] = "返回一个数值的反正弦值。";
Blockly.Msg["MATH_TRIG_TOOLTIP_ATAN"] = "返回一个数值的反正切值。";
Blockly.Msg["MATH_TRIG_TOOLTIP_COS"] = "返回指定角度的余弦值（非弧度）。";
Blockly.Msg["MATH_TRIG_TOOLTIP_SIN"] = "返回指定角度的正弦值（非弧度）。";
Blockly.Msg["MATH_TRIG_TOOLTIP_TAN"] = "返回指定角度的正切值（非弧度）。";
Blockly.Msg["NEW_COLOUR_VARIABLE"] = "创建颜色变量...";
Blockly.Msg["NEW_NUMBER_VARIABLE"] = "创建数字变量...";
Blockly.Msg["NEW_STRING_VARIABLE"] = "创建字符串变量...";
Blockly.Msg["NEW_VARIABLE"] = "创建变量...";
Blockly.Msg["NEW_VARIABLE_TITLE"] = "新变量的名称：";
Blockly.Msg["NEW_VARIABLE_TYPE_TITLE"] = "新变量的类型：";
Blockly.Msg["ORDINAL_NUMBER_SUFFIX"] = "-";
Blockly.Msg["PROCEDURES_ALLOW_STATEMENTS"] = "允许声明";
Blockly.Msg["PROCEDURES_BEFORE_PARAMS"] = "参数：";
Blockly.Msg["PROCEDURES_CALLNORETURN_HELPURL"] = "https://zh.wikipedia.org/wiki/子程序";
Blockly.Msg["PROCEDURES_CALLNORETURN_TOOLTIP"] = "运行用户定义的函数“%1”。";
Blockly.Msg["PROCEDURES_CALLRETURN_HELPURL"] = "https://zh.wikipedia.org/wiki/子程序";
Blockly.Msg["PROCEDURES_CALLRETURN_TOOLTIP"] = "运行用户定义的函数“%1”，并使用它的输出值。";
Blockly.Msg["PROCEDURES_CALL_BEFORE_PARAMS"] = "参数：";
Blockly.Msg["PROCEDURES_CREATE_DO"] = "创建“%1”";
Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"] = "描述该功能...";
Blockly.Msg["PROCEDURES_DEFNORETURN_DO"] = "-";
Blockly.Msg["PROCEDURES_DEFNORETURN_HELPURL"] = "https://zh.wikipedia.org/wiki/子程序";
Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"] = "函数名";
Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"] = "";
Blockly.Msg["PROCEDURES_DEFNORETURN_TOOLTIP"] = "创建一个不带输出值的函数。";
Blockly.Msg["PROCEDURES_DEFRETURN_HELPURL"] = "https://zh.wikipedia.org/wiki/子程序";
Blockly.Msg["PROCEDURES_DEFRETURN_RETURN"] = "返回";
Blockly.Msg["PROCEDURES_DEFRETURN_TOOLTIP"] = "创建一个有输出值的函数。";
Blockly.Msg["PROCEDURES_DEF_DUPLICATE_WARNING"] = "警告：此函数具有重复参数。";
Blockly.Msg["PROCEDURES_HIGHLIGHT_DEF"] = "突出显示函数定义";
Blockly.Msg["PROCEDURES_IFRETURN_HELPURL"] = "http://c2.com/cgi/wiki?GuardClause";
Blockly.Msg["PROCEDURES_IFRETURN_TOOLTIP"] = "如果值为真，则返回第二个值。";
Blockly.Msg["PROCEDURES_IFRETURN_WARNING"] = "警告：这个块只能在函数内部使用。";
Blockly.Msg["PROCEDURES_MUTATORARG_TITLE"] = "输入名称：";
Blockly.Msg["PROCEDURES_MUTATORARG_TOOLTIP"] = "添加函数输入。";
Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TITLE"] = "输入";
Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TOOLTIP"] = "添加、移除或重新排此函数的输入。";
Blockly.Msg["REDO"] = "重做";
Blockly.Msg["REMOVE_COMMENT"] = "删除注释";
Blockly.Msg["RENAME_VARIABLE"] = "重命名变量...";
Blockly.Msg["RENAME_VARIABLE_TITLE"] = "将所有“%1”变量重命名为:";
Blockly.Msg["TEXT_APPEND_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";  // untranslated
Blockly.Msg["TEXT_APPEND_TITLE"] = "在%1之后加上文本%2";
Blockly.Msg["TEXT_APPEND_TO"] = "向";
Blockly.Msg["TEXT_APPEND_TOOLTIP"] = "将一些文本追加到变量“%1”里。";
Blockly.Msg["TEXT_CHANGECASE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#adjusting-text-case";  // untranslated
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_LOWERCASE"] = "转为小写";
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_TITLECASE"] = "转为首字母大写";
Blockly.Msg["TEXT_CHANGECASE_OPERATOR_UPPERCASE"] = "转为大写";
Blockly.Msg["TEXT_CHANGECASE_TOOLTIP"] = "用不同的大小写模式复制并返回这段文字。";
Blockly.Msg["TEXT_CHARAT_FIRST"] = "获取第一个字符";
Blockly.Msg["TEXT_CHARAT_FROM_END"] = "获取倒数第#个字符";
Blockly.Msg["TEXT_CHARAT_FROM_START"] = "获取第#个字符";
Blockly.Msg["TEXT_CHARAT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-text";  // untranslated
Blockly.Msg["TEXT_CHARAT_LAST"] = "获取最后一个字符";
Blockly.Msg["TEXT_CHARAT_RANDOM"] = "获取随机一个字符";
Blockly.Msg["TEXT_CHARAT_TAIL"] = "-";
Blockly.Msg["TEXT_CHARAT_TITLE"] = "在文本%1 里 %2";
Blockly.Msg["TEXT_CHARAT_TOOLTIP"] = "返回位于指定位置的字符。";
Blockly.Msg["TEXT_COUNT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#counting-substrings";
Blockly.Msg["TEXT_COUNT_MESSAGE0"] = "计算%1在%2里出现的次数";
Blockly.Msg["TEXT_COUNT_TOOLTIP"] = "计算在一段文本中，某个部分文本重复出现了多少次。";
Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TOOLTIP"] = "将一个项添加到文本中。";
Blockly.Msg["TEXT_CREATE_JOIN_TITLE_JOIN"] = "拼接";
Blockly.Msg["TEXT_CREATE_JOIN_TOOLTIP"] = "添加、移除或重新排列各节来重新配置这个文本块。";
Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_END"] = "到倒数第#个字符";
Blockly.Msg["TEXT_GET_SUBSTRING_END_FROM_START"] = "到第#个字符";
Blockly.Msg["TEXT_GET_SUBSTRING_END_LAST"] = "到最后一个字符";
Blockly.Msg["TEXT_GET_SUBSTRING_HELPURL"] = "https://github.com/google/blockly/wiki/Text#extracting-a-region-of-text";  // untranslated
Blockly.Msg["TEXT_GET_SUBSTRING_INPUT_IN_TEXT"] = "从文本";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FIRST"] = "获取子串，从第一个字符";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_END"] = "获取子串，从倒数第#个字符";
Blockly.Msg["TEXT_GET_SUBSTRING_START_FROM_START"] = "获取子串，从第#个字符";
Blockly.Msg["TEXT_GET_SUBSTRING_TAIL"] = "-";
Blockly.Msg["TEXT_GET_SUBSTRING_TOOLTIP"] = "返回文本中指定的一部分。";
Blockly.Msg["TEXT_INDEXOF_HELPURL"] = "https://github.com/google/blockly/wiki/Text#finding-text";  // untranslated
Blockly.Msg["TEXT_INDEXOF_OPERATOR_FIRST"] = "寻找第一次出现的文本";
Blockly.Msg["TEXT_INDEXOF_OPERATOR_LAST"] = "寻找最后一次出现的文本";
Blockly.Msg["TEXT_INDEXOF_TITLE"] = "在文本 %1 里 %2  %3";
Blockly.Msg["TEXT_INDEXOF_TOOLTIP"] = "返回第一个文本段在第二个文本段中的第一/最后一个匹配项的起始位置。如果未找到，则返回%1。";
Blockly.Msg["TEXT_ISEMPTY_HELPURL"] = "https://github.com/google/blockly/wiki/Text#checking-for-empty-text";  // untranslated
Blockly.Msg["TEXT_ISEMPTY_TITLE"] = "%1是空的";
Blockly.Msg["TEXT_ISEMPTY_TOOLTIP"] = "如果给定的文本为空，则返回真。";
Blockly.Msg["TEXT_JOIN_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-creation";  // untranslated
Blockly.Msg["TEXT_JOIN_TITLE_CREATEWITH"] = "创建文本，内容：";
Blockly.Msg["TEXT_JOIN_TOOLTIP"] = "通过串起任意数量的项以建立一段文本。";
Blockly.Msg["TEXT_LENGTH_HELPURL"] = "https://github.com/google/blockly/wiki/Text#text-modification";  // untranslated
Blockly.Msg["TEXT_LENGTH_TITLE"] = "%1的长度";
Blockly.Msg["TEXT_LENGTH_TOOLTIP"] = "返回给定文本的字母数（包括空格）。";
Blockly.Msg["TEXT_PRINT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#printing-text";  // untranslated
Blockly.Msg["TEXT_PRINT_TITLE"] = "输出%1";
Blockly.Msg["TEXT_PRINT_TOOLTIP"] = "输出指定的文字、数字或其他值。";
Blockly.Msg["TEXT_PROMPT_HELPURL"] = "https://github.com/google/blockly/wiki/Text#getting-input-from-the-user";  // untranslated
Blockly.Msg["TEXT_PROMPT_TOOLTIP_NUMBER"] = "要求用户输入数字。";
Blockly.Msg["TEXT_PROMPT_TOOLTIP_TEXT"] = "要求用户输入一些文本。";
Blockly.Msg["TEXT_PROMPT_TYPE_NUMBER"] = "要求输入数字，并显示提示消息";
Blockly.Msg["TEXT_PROMPT_TYPE_TEXT"] = "要求输入文本，并显示提示消息";
Blockly.Msg["TEXT_REPLACE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#replacing-substrings";
Blockly.Msg["TEXT_REPLACE_MESSAGE0"] = "把%3中的%1替换为%2";
Blockly.Msg["TEXT_REPLACE_TOOLTIP"] = "在一段文本中，将出现过的某部分文本都替换掉。";
Blockly.Msg["TEXT_REVERSE_HELPURL"] = "https://github.com/google/blockly/wiki/Text#reversing-text";
Blockly.Msg["TEXT_REVERSE_MESSAGE0"] = "倒转文本%1";
Blockly.Msg["TEXT_REVERSE_TOOLTIP"] = "将文本中各个字符的顺序倒转。";
Blockly.Msg["TEXT_TEXT_HELPURL"] = "https://zh.wikipedia.org/wiki/字符串";
Blockly.Msg["TEXT_TEXT_TOOLTIP"] = "一个字、词语或一行文本。";
Blockly.Msg["TEXT_TRIM_HELPURL"] = "https://github.com/google/blockly/wiki/Text#trimming-removing-spaces";  // untranslated
Blockly.Msg["TEXT_TRIM_OPERATOR_BOTH"] = "消除其两侧的空白";
Blockly.Msg["TEXT_TRIM_OPERATOR_LEFT"] = "消除其左侧的空白";
Blockly.Msg["TEXT_TRIM_OPERATOR_RIGHT"] = "消除其右侧的空白";
Blockly.Msg["TEXT_TRIM_TOOLTIP"] = "从某一端或同时从两端删除多余的空白，并返回这段文字的一个副本。";
Blockly.Msg["TODAY"] = "今天";
Blockly.Msg["UNDO"] = "撤销";
Blockly.Msg["UNNAMED_KEY"] = "未命名";
Blockly.Msg["VARIABLES_DEFAULT_NAME"] = "项目";
Blockly.Msg["VARIABLES_GET_CREATE_SET"] = "创建“设定%1”";
Blockly.Msg["VARIABLES_GET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#get";  // untranslated
Blockly.Msg["VARIABLES_GET_TOOLTIP"] = "返回此变量的值。";
Blockly.Msg["VARIABLES_SET"] = "赋值 %1 为 %2";
Blockly.Msg["VARIABLES_SET_CREATE_GET"] = "创建“获得%1”";
Blockly.Msg["VARIABLES_SET_HELPURL"] = "https://github.com/google/blockly/wiki/Variables#set";  // untranslated
Blockly.Msg["VARIABLES_SET_TOOLTIP"] = "设置此变量，以使它和输入值相等。";
Blockly.Msg["VARIABLE_ALREADY_EXISTS"] = "名字叫“%1”的变量已经存在了。";
Blockly.Msg["VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE"] = "名字叫“%1”的变量已经有了另一个类型：“%2”。";
Blockly.Msg["WORKSPACE_ARIA_LABEL"] = "Blockly工作区";
Blockly.Msg["WORKSPACE_COMMENT_DEFAULT_TEXT"] = "说点什么...";
Blockly.Msg["CONTROLS_FOREACH_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_FOR_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_IF_ELSEIF_TITLE_ELSEIF"] = Blockly.Msg["CONTROLS_IF_MSG_ELSEIF"];
Blockly.Msg["CONTROLS_IF_ELSE_TITLE_ELSE"] = Blockly.Msg["CONTROLS_IF_MSG_ELSE"];
Blockly.Msg["CONTROLS_IF_IF_TITLE_IF"] = Blockly.Msg["CONTROLS_IF_MSG_IF"];
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["CONTROLS_WHILEUNTIL_INPUT_DO"] = Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"];
Blockly.Msg["LISTS_CREATE_WITH_ITEM_TITLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["LISTS_GET_INDEX_HELPURL"] = Blockly.Msg["LISTS_INDEX_OF_HELPURL"];
Blockly.Msg["LISTS_GET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_GET_SUBLIST_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_INDEX_OF_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["LISTS_SET_INDEX_INPUT_IN_LIST"] = Blockly.Msg["LISTS_INLIST"];
Blockly.Msg["MATH_CHANGE_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["PROCEDURES_DEFRETURN_COMMENT"] = Blockly.Msg["PROCEDURES_DEFNORETURN_COMMENT"];
Blockly.Msg["PROCEDURES_DEFRETURN_DO"] = Blockly.Msg["PROCEDURES_DEFNORETURN_DO"];
Blockly.Msg["PROCEDURES_DEFRETURN_PROCEDURE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_PROCEDURE"];
Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"] = Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"];
Blockly.Msg["TEXT_APPEND_VARIABLE"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];
Blockly.Msg["TEXT_CREATE_JOIN_ITEM_TITLE_ITEM"] = Blockly.Msg["VARIABLES_DEFAULT_NAME"];

Blockly.Msg["MATH_HUE"] = "230";
Blockly.Msg["LOOPS_HUE"] = "120";
Blockly.Msg["LISTS_HUE"] = "260";
Blockly.Msg["LOGIC_HUE"] = "210";
Blockly.Msg["VARIABLES_HUE"] = "330";
Blockly.Msg["TEXTS_HUE"] = "160";
Blockly.Msg["PROCEDURES_HUE"] = "290";
Blockly.Msg["COLOUR_HUE"] = "20";
Blockly.Msg["VARIABLES_DYNAMIC_HUE"] = "310";

Blockly.MESSAGE="消息"
Blockly.RECEIVE="当收到";
Blockly.ANY_MESSAGE="任意消息时";
Blockly.TOPIC_MESSAGE="主题消息时";
Blockly.PUBLISH_MESSAGE="主题发布";
Blockly.GETREQ="GET请求";
Blockly.POSTREQ="POST请求";
Blockly.USEDATA="使用数据";
Blockly.WAITREQ="并等待响应";
Blockly.WAITJSONREQ="并等待JSON响应";

Blockly.BUTTON_DOWN="按键被按下时";
Blockly.BUTTON_UP="按键/开关被松开时";
Blockly.BUTTON_RECIEVE_MESSAGE="开关收到消息时";
Blockly.BUTTON_SWITCH="切换";
Blockly.BUTTON_SWITCH_STATE="开关的状态";
Blockly.PIXEL_SWITCH="切换";
Blockly.PIXEL_SWITCH_STATE="点阵屏的像素";

Blockly.DRAG_SLIDER="滑杆被拖动时";
Blockly.SLIDER_RECIEVE_MESSAGE="滑杆收到消息时";
Blockly.SLIDER_NUM_IS="滑杆数值为";
Blockly.SLIDER_NUM="滑杆的数值";

Blockly.WHEN_TEXTINPUT_SEND="文本输入发送消息时";
Blockly.THROUGH="通过";
Blockly.TEXTINPUT_SEND="文本输入发送消息";
Blockly.SELECT_SEND="下拉选项发送消息并变更选项为";

Blockly.JOYSTICK_DRAGGED="摇杆被拖动时";
Blockly.JOYSTICK_SENDXY="摇杆发送位置消息";
Blockly.JOYSTICK_X="摇杆的横坐标";
Blockly.JOYSTICK_Y="摇杆的纵坐标";

Blockly.RGB_COLOR_SELECTED="RGB色盘被选色时";
Blockly.RGB_MESSAGE_RECIEVED="RGB色盘收到消息时";
Blockly.RGB_SEND="RGB色盘发送消息";
Blockly.RGB_NOW_COLOR="RGB色盘的当前颜色";

Blockly.BULB_RECIEVED_MESSAGE="指示灯收到消息时";
Blockly.TO="向";
Blockly.SEND_MESSAGE="指示灯发送消息";
Blockly.BULB_NOW_STATE="指示灯的当前状态";

Blockly.LED_RECIEVED_MESSAGE="文本显示屏收到消息时";
Blockly.TEXTLED_SEND_MESSAGE="文本显示屏发送消息";
Blockly.TEXTLED_NOW="文本显示屏的当前显示";

Blockly.LINECHART_RECIEVED="折线图表收到消息时";
Blockly.LINECHART_SEND_MESSAGE="折线图表发送消息";
Blockly.LET="令";
Blockly.CLEAR_LINECHART="折线图表清空";
Blockly.LINECHART_ALL_MESSAGE="折线图表的全部历史消息";
Blockly.LINECHART_N_MESSAGE="折线图表的至多前";
Blockly.LINECHART_MESSAGE="条消息";
Blockly.LINECHART_LATEST_MESSAGE="折线图表的最新一条消息";

Blockly.TIMER_TRIGGERED="定时触发器触发时";
Blockly.GET_TRIGGER_TIMES="定时触发器的触发次数"

Blockly.TRIGGER_TRIGGERED="条件触发器触发时";
Blockly.GET_TRIGGER_TRIGGERS="条件触发器的触发次数"

Blockly.BLUETOOTH_TRIGGERED="蓝牙转发器收到消息时";
Blockly.GET_BLUETOOTH_STATUS="蓝牙转发器连接的设备";
Blockly.BLUETOOTH_SENT = "蓝牙转发器发送消息"

Blockly.CAMERA_SENT = "摄像头发送消息时"
Blockly.MIC_SENT = "语音识别发送消息时"
Blockly.SELECT_SENT = "下拉选项发送消息时"

Blockly.BARCHART_RECIEVED="柱状图收到消息时";
Blockly.BARCHART_SEND_MESSAGE="柱状图发送消息";
Blockly.CLEAR_BARCHART="柱状图表清空";
Blockly.BARCHART_NOW_MESSAGE="柱状图表的当前数据";

Blockly.DATASHEET_RECIEVED="数据表格收到消息时";
Blockly.DATASHEET_SEND_MESSAGE="数据表格发送消息";
Blockly.CLEAR_DATASHEET="数据表格清空";
Blockly.DATASHEET_ALL_MESSAGE="数据表格的全部数据";

Blockly.DASHBOARD_RECIEVED="仪表盘收到消息时";
Blockly.DASHBOARD_SEND_MESSAGE="仪表盘发送消息";
Blockly.DASHBOARD_NOW_MESSAGE="仪表盘的当前值";

Blockly.DATAMAP_RECIEVED="数据地图收到消息时";
Blockly.DATAMAP="数据地图";
Blockly.DATAMAP_LONG="经度";
Blockly.DATAMAP_LAT="纬度";
Blockly.DATAMAP_SEND_MESSAGE="发送消息列表";
Blockly.CLEAR_DATAMAP="数据地图清空";
Blockly.CLEAR_PIXEL="点阵屏清空画布";
Blockly.FACE_RECOGNIZED = "人脸识别组件识别到人脸时"

Blockly.WS_UPDATED="气象仪更新数据时";
Blockly.WS_SEND="气象仪发送数据时";
Blockly.LET_WS_UPDATE="气象仪更新数据";
Blockly.LET_WS_SEND="气象仪下发数据";
Blockly.WS_PARA="气象仪的";
Blockly.WS_INFO="信息";

Blockly.MIXLY_MICROPYTHON_SOCKET_TO="至";
Blockly.MIXLY_MICROBIT_JS_CURRENT = "当";
Blockly.MIXLY_MICROBIT_PY_STORAGE_GET = "获取";

Blockly.MIXLY_LENGTH = "的长度"
Blockly.Msg.DICTS_CREATE_EMPTY_TITLE = "初始化为空字典";
Blockly.Msg.DICTS_CREATE_EMPTY_TOOLTIP = "返回一个空字典，长度为 0，不包含任何数据记录";
Blockly.Msg.DICTS_CREATE_WITH_CONTAINER_TOOLTIP = "增加、删除或重新排列各部分以此重新配置这个字典块。";
Blockly.Msg.DICTS_CREATE_WITH_INPUT_WITH = "初始化字典为";
Blockly.Msg.DICTS_CREATE_WITH_ITEM_TITLE = "条目"
Blockly.Msg.DICTS_CREATE_WITH_ITEM_TOOLTIP = "将一个项添加到字典中。";
Blockly.Msg.DICTS_CREATE_WITH_TOOLTIP = "建立一个具有任意数量项目的字典。";
Blockly.Msg.DICTS_CREATE_WITH_ITEM_KEY = "key"
Blockly.Msg.DICT_KEYS = "获取所有键";
Blockly.Msg.DICTS_KEYS_TOOLTIP = "返回一个列表，包括一个字典所有的键";
Blockly.Msg.DICTS_GET_FROM_DICTS = "从字典";
Blockly.Msg.DICTS_GET_IN = "获取键";
Blockly.Msg.DICTS_GET_TOOLTIP = "获取字典中某个键的对应值，若键名称不存在则触发KeyError";
Blockly.Msg.DICTS_GET_DEFAULT_TOOLTIP = "获取字典中某个键的对应值，若键名称不存在则返回默认值";
Blockly.Msg.DICTS_ADD_in_DICT = "在字典";
Blockly.Msg.DICTS_ADD = "中添加或修改条目 键";
Blockly.Msg.DICTS_ADD_VALUE = "对应值";
Blockly.Msg.DICTS_ADD_OR_CHANGE_TOOLTIP = "在字典中添加或删除条目";
Blockly.Msg.DICTS_DELETE_IN = "中删除条目 键";
Blockly.Msg.DICTS_DELETE_VALUE = "及对应值";
Blockly.Msg.DICTS_DELETE_TOOLTIP = "删除字典中某个条目";
Blockly.Msg.DICT_CLEAR = "清空字典中所有条目";
Blockly.Msg.DICT_ITEMS = "字典转化为列表";
Blockly.Msg.DICTS_ITEMS_TOOLTIP = "返回一个列表，包括一个字典可遍历的所有键和对应值";
Blockly.Msg.DICT_VALUES = "获取所有键对应的值";
Blockly.Msg.DICTS_VALUES_TOOLTIP = "返回一个列表，包括一个字典所有键的对应值";
Blockly.Msg.DICTS_LENGTH_TOOLTIP = "返回字典的长度，即键的个数";
Blockly.Msg.DICT_DELDICT = "删除字典";
Blockly.Msg.PRINT_MESSAGE="输出打印";
Blockly.Msg.EVERY="每隔";
Blockly.Msg.MILLISECOND="毫秒";
Blockly.Msg.AFTER="后";
Blockly.Msg.CURRENT_TIME="获取当前时间";
Blockly.MIXLY_CHANGE = "改变"

Blockly.PARSE_INT = "转为整数";
Blockly.PARSE_FLOAT = "转为浮点数";
Blockly.GET_LONG = "获取当前经度";
Blockly.GET_LATI = "获取当前纬度";

Blockly.GET_KEYBOARD_INPUT="文本输入的文本";
Blockly.GET_SELECT_OPTIONS = "下拉选项的选项列表"

Blockly.JSON2TEXT = "字典转文本";
Blockly.TEXT2JSON = "文本转字典";

Blockly.USEAPIKEY = "使用百度API Key";
Blockly.USESECRETKEY = "和Secret Key";
Blockly.GETTOKEN = "获取的Access Token";

Blockly.TRANSORIGIN = "使用Access Token";
Blockly.USETEXT = "将文本";
Blockly.USETEXT2 = "使用文本";
Blockly.BOT = "与文心一言对话";
Blockly.TOLANG = "翻译为";
Blockly.PARA1 = "，参数: result";

class CustomCategory extends Blockly.ToolboxCategory {
  // 自定义类别创造函数
  // categoryDef: 类别定义的信息
  // toolbox: 表示类别的父级toolbox
  // opt_parent: 可选参数，表示其父类别
  constructor(categoryDef, toolbox, opt_parent) {
      super(categoryDef, toolbox, opt_parent);
  }
  addColourBorder_(colour) {
      super.addColourBorder_(colour);
      // this.rowDiv_.style.backgroundColor = 'unset';
      this.iconDom_.style.color = colour;
  }
  setSelected(isSelected) {
      super.setSelected(isSelected);
      if (isSelected) {
          // 设置icon的颜色和文本颜色相同
          this.iconDom_.style.color = 'white'; // ====本次新增代码====
      } else {
          // 设置icon的颜色和文本颜色相同
          this.iconDom_.style.color = this.colour_; // ====本次新增代码====
      }
  }
}