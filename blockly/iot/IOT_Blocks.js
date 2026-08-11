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
        this.appendDummyInput().appendField(new Blockly.FieldDropdown(BlocklyI18n.options('switchState')), "state");
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
      this.appendDummyInput().appendField(new Blockly.FieldDropdown(BlocklyI18n.options('pixelState')), "state");
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
      .appendField(new Blockly.FieldDropdown(BlocklyI18n.options('trafficLight')), "message");
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
  }
};

Blockly.Blocks['beep_received'] = {
  init: function() {
      this.setColour(datamap_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.BEEP_RECEIVED);
      this.setInputsInline(true);
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip("");
  }
};

Blockly.Blocks['qr_recognized'] = {
  init: function() {
      this.setColour(datamap_HUE);
      this.appendDummyInput().appendField(Blockly.MIXLY_MICROBIT_JS_CURRENT);
      this.appendValueInput("name").setCheck("String");
      this.appendDummyInput().appendField(Blockly.QR_RECOGNIZED);
      this.appendDummyInput().appendField(Blockly.Msg.PROCEDURES_CALL_BEFORE_PARAMS+"value");
      this.setInputsInline(true);
      this.appendStatementInput('DO0').appendField(Blockly.Msg.CONTROLS_REPEAT_INPUT_DO);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip("");
  }
};

Blockly.Blocks['beep_send'] = {
  init: function() {
    this.appendDummyInput().appendField(Blockly.LET);
    this.appendValueInput("name").setCheck("String");
    this.appendDummyInput().appendField(Blockly.BEEP_SEND);
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(datamap_HUE);
    this.setTooltip('');
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
      .appendField(new Blockly.FieldDropdown(BlocklyI18n.options('weather')), "message");
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

Blockly.JavaScript.beep_received =function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BEEP)\n"+".bind(MixIO.eventTags.BEEP_RECEIVED, function(event){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.qr_recognized =function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.QR)\n"+".bind(MixIO.eventTags.QR_RECOGNIZED, function(event, value){\n"
  +Blockly.JavaScript.statementToCode(block, "DO0" )+"\n"+"})\n"
  return code; 
};

Blockly.JavaScript.beep_send=function(block) {
  var name = Blockly.JavaScript.valueToCode(this, 'name', Blockly.JavaScript.ORDER_ATOMIC);
  var code="MixIO.getInstance("+name+",MixIO.typeTags.BEEP)\n"+".beep()\n"
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

// Blockly core and MixIO-specific messages are loaded from the locale files.
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
