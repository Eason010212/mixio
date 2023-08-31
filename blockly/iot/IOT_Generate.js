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
    var code="MixIO.getInstance("+name+",MixIO.typeTags.KEYBOARD)\n"+".trigger(MixIO.actionTags.KEYBOARD_SEND,"+message+")"
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