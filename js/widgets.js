/**
 * @Author 宋义深 1371033826@qq.com
 * @Description MixIO-组件逻辑文件
 * @Version 2.8.30
 */

tbd = undefined;

function add_block(width, height, contents, attrs) {
    var itemdiv = $("<div/>")
    itemdiv.attr("class", "item")
    itemdiv.css("width", standardWidth * width + 4 * (width - 1) - (standardWidth * width + 4 * (width - 1)) % 20 + "px")
    itemdiv.css("height", standardWidth * height + 4 * (height - 1) - (standardWidth * height + 4 * (height - 1)) % 20 + "px")
    itemdiv.css("border-radius", "10px")
    contentdiv = $("<div/>")
    contentdiv.attr("class", "item-content")
    contentdiv.css("display", "flex")
    contentdiv.css("flex-direction", "column")
    contentdiv.css("align-items", "center")
    contentdiv.css("justify-content", "center")
    for (content in contents)
        contentdiv.append(contents[content])
    for (attr in attrs)
        itemdiv.attr(attrs[attr][0], attrs[attr][1])
    itemdiv.append(contentdiv)
    grid.append(itemdiv[0])
    itemdiv.bind('mousedown', function(event) {
        startX = event.pageX
        startY = event.pageY
        isOpen = false
    })
    itemdiv.bind('mouseup', function(event) {
        endX = event.pageX
        endY = event.pageY
        if (typeof(isOpen) != "undefined" && !isOpen)
            itemdiv.click()
        isOpen = true
    })
    itemdiv.bind('mousedown', function(event) {
        if(itemdiv.attr('user-type') != 'magic')
            grid.append(itemdiv[0])
        else
            grid.prepend(itemdiv[0])
    })

    itemdiv.draggable({
        onStopDrag: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - (parseInt(itemdiv.css('left')) % 20) + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - (parseInt(itemdiv.css('top')) % 20) + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft + 'px')
            itemdiv.css('top', stdTop + 'px')
            // 对于tmpInnerItems中的所有item，也进行同样的处理
            if(itemdiv.attr('user-type') == 'magic')
            {
                for(var i=0;i<tmpInnerItems.length;i++)
                {
                    var item = $(".item").eq(tmpInnerItems[i])
                    var left = parseInt(item.css('left')) - (parseInt(item.css('left')) % 20) + (parseInt(item.css('left')) % 20 > 10 ? 1 : 0) * 20
                    var top = parseInt(item.css('top')) - (parseInt(item.css('top')) % 20) + (parseInt(item.css('top')) % 20 > 10 ? 1 : 0) * 20
                    item.css('left', left + 'px')
                    item.css('top', top + 'px')
                }
            }
            tmpInnerItems = []
        },
        onStartDrag: function(event) {
            lastDragX = event.pageX
            lastDragY = event.pageY
            if(itemdiv.attr('user-type') == 'magic')
            {
                
                // 包围在块内部的所有item
                tmpInnerItems = []
                // magic块的边界坐标
                var magicLeft = parseInt(itemdiv.css('left'))
                var magicTop = parseInt(itemdiv.css('top'))
                var magicRight = magicLeft + parseInt(itemdiv.css('width'))
                var magicBottom = magicTop + parseInt(itemdiv.css('height'))
                // 遍历所有.item
                var items = $(".item")
                tmpOriHeight = parseInt(itemdiv.css('height'))
                tmpOriWidth = parseInt(itemdiv.css('width'))
                for(var i=0;i<items.length;i++)
                {
                    if(items.eq(i).attr('user-type') != 'magic')
                    {  
                        var item = items.eq(i)
                        var left = parseInt(item.css('left'))
                        var top = parseInt(item.css('top'))
                        var right = left + parseInt(item.css('width'))
                        var bottom = top + parseInt(item.css('height'))
                        if(left+5 >= magicLeft && right-5 <= magicRight && top+5 >= magicTop && bottom-5 <= magicBottom)
                            tmpInnerItems.push(i)
                    }
                }
                console.log(tmpInnerItems)
            }
        },
        onDrag: function(event) {
            var dx = event.pageX - lastDragX
            var dy = event.pageY - lastDragY
            lastDragX = event.pageX
            lastDragY = event.pageY
            
            var items = $(".item")
            if(itemdiv.attr('user-type') == 'magic')
            {
                if(tmpOriWidth==parseInt(itemdiv.css('width')) && tmpOriHeight==parseInt(itemdiv.css('height')))
                for(var i=0;i<tmpInnerItems.length;i++)
                {
                    var item = items.eq(tmpInnerItems[i])
                    var left = parseInt(item.css('left'))
                    var top = parseInt(item.css('top'))
                    item.css('left', left + dx)
                    item.css('top', top + dy)
                }
            }
        }
    })
    if(itemdiv.attr('user-type') != 'pixel')
    itemdiv.resizable({
        onStopResize: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - parseInt(itemdiv.css('left')) % 20 + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - parseInt(itemdiv.css('top')) % 20 + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft)
            itemdiv.css('top', stdTop)
            var stdWidth = parseInt(itemdiv.css('width')) - parseInt(itemdiv.css('width')) % 20 + (parseInt(itemdiv.css('width')) % 20 > 10 ? 1 : 0) * 20
            var stdHeight = parseInt(itemdiv.css('height')) - parseInt(itemdiv.css('height')) % 20 + (parseInt(itemdiv.css('height')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('width', stdWidth)
            itemdiv.css('height', stdHeight)
        }
    })
    return itemdiv
}

function add_pixel(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var pixelDiv = $("<div class='pixelDiv'/>")
    var xpixel = parseInt(user_content.split(',')[0])
    var ypixel = parseInt(user_content.split(',')[1])
    for(var i=0;i<ypixel;i++){
        var row = $("<div class='pixelrow'/>")
        for(var j=0;j<xpixel;j++){
            var pixel = $("<div class='pixel'/>")
            row.append(pixel)
        }
        pixelDiv.append(row)
    }
    contents.push(pixelDiv)

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    attrs = [
        ['user-type', 'pixel'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(3, 3, contents, attrs)
    var stdwidth = xpixel*20 + 20 + "px"
    var stdheight = ypixel*20 + 60 + "px"
    itemdiv.css('width', stdwidth)
    itemdiv.css('height', stdheight)
    var editForm = $("<div class='editForm'/>")
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_pixel.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].xpixel + '</h5>'))
    var xpixel_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var xpixel_input = $("<input class='form-control form-control-user' type='number' min='1' max='100' style='text-align:center'/>")
    xpixel_input_div.append(xpixel_input)
    editForm.append(xpixel_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].ypixel + '</h5>'))
    var ypixel_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var ypixel_input = $("<input class='form-control form-control-user' type='number' min='1' max='100' style='text-align:center'/>")
    ypixel_input_div.append(ypixel_input)
    editForm.append(ypixel_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                var content = message1.toString()
                var pixels = content.split(',')
                for (var i = 0; i < pixels.length; i++) {
                    var pixel = pixels[i].split('-')
                    var x = parseInt(pixel[0])
                    var y = parseInt(pixel[1])
                    var color = pixel[2]
                    if(color == '0')
                        color = '#EEEEEE'
                    else if(color == '1')
                        color = '#4E73DF'
                    var pixel = itemdiv.find('.pixelrow').eq(x).find('.pixel').eq(y)
                    pixel.css('background-color', color)
                }
            }
    })
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (xpixel_input.val() > 0 && xpixel_input.val() < 101 && ypixel_input.val() > 0 && ypixel_input.val() < 101) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        xpixel = xpixel_input.val()
                        ypixel = ypixel_input.val()
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        title.parent().parent().attr('user-content', xpixel + ',' + ypixel)
                        pixelDiv.empty()
                        console.log(xpixel)
                        console.log(ypixel)
                        for(var i=0;i<ypixel;i++){
                            var row = $("<div class='pixelrow'/>")
                            for(var j=0;j<xpixel;j++){
                                var pixel = $("<div class='pixel'/>")
                                row.append(pixel)
                            }
                            pixelDiv.append(row)
                        }
                        var stdwidth = xpixel*20 + 20 + "px"
                        var stdheight = ypixel*20 + 60 + "px"
                        itemdiv.css('width', stdwidth)
                        itemdiv.css('height', stdheight)
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext(JSLang[lang].invalidPixel)
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
            {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            xpixel_input.val(xpixel)
            ypixel_input.val(ypixel)
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_button(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var button = $("<label class='switch' style='margin-bottom:0'></label>")
    var button2 = $("<a class='pushButton'/>")
    if (user_content == 2) {
        button.attr("hidden", "hidden")
        button2.removeAttr("hidden")
    } else {
        button2.attr("hidden", "hidden")
        button.removeAttr("hidden")
    }
    button2.click(function(event) {
        event.stopPropagation()
    })
    var checkbox = $("<input type='checkbox'>")
    if (user_content == 1)
        checkbox.prop('checked', true)
    else
        checkbox.prop('checked', false)
    var checkDiv = $("<div class='slider round'></div>")
    button.append(checkbox)
    checkDiv.click(function(event) {
        event.stopPropagation();
    })
    checkDiv.mousedown(function(event) {
        event.stopPropagation();
    })
    button.click(function(event) {
        event.stopPropagation();
        event.preventDefault();
    })
    
    button.mouseup(function(event) {
        if (checkbox.prop('checked')) {
            checkbox.prop('checked', false)
            title.parent().parent().attr('user-content', 0)
            publish(topic.text(), '0')
        } else {
            checkbox.prop('checked', true)
            title.parent().parent().attr('user-content', 1)
            publish(topic.text(), '1')
        }
        itemdiv.trigger(MixIO.eventTags.BUTTON_LOOSED)
    })
    var isMobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    if(!isMobile)
    {
        button2.mouseup(function(event) {
            event.stopPropagation();
            event.preventDefault();
            publish(topic.text(), '0')
            itemdiv.trigger(MixIO.eventTags.BUTTON_LOOSED)
        })
        button2.mousedown(function(event) {
            event.stopPropagation();
            event.preventDefault();
            publish(topic.text(), '1')
            itemdiv.trigger(MixIO.eventTags.BUTTON_PRESSED)
        })
    }
    else{
        button2[0].addEventListener('touchstart',
            function(event) {
                event.stopPropagation();
                event.preventDefault();
                button2.attr('class', 'pushButton2')
                publish(topic.text(), '1')
                itemdiv.trigger(MixIO.eventTags.BUTTON_PRESSED)
            }
        )
        button2[0].addEventListener('touchend', function(event) {
            event.stopPropagation();
            event.preventDefault();
            button2.attr('class', 'pushButton')
            publish(topic.text(), '0')
            itemdiv.trigger(MixIO.eventTags.BUTTON_LOOSED)
        })
    }
    
    button.append(checkDiv)
    contents.push(button)
    contents.push(button2)

    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (title.parent().parent().attr('user-content') != 2 && topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                if (message1 == 0) {
                    checkbox.prop('checked', false)
                    title.parent().parent().attr('user-content', 0)
                } else if (message1 == 1) {
                    checkbox.prop('checked', true)
                    title.parent().parent().attr('user-content', 1)
                }
                itemdiv.trigger(MixIO.eventTags.BUTTON_CHANGED, [Uint8ArrayToString(message1)])
            }
    })

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        console.log(modifyDia)
        if (modeCheckbox.prop("checked"))
            editForm.find("img").attr("src", "icons/input_button2.svg")
        else
            editForm.find("img").attr("src", "icons/input_button.svg")
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    attrs = [
        ['user-type', 'input_button'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(1, 1, contents, attrs)
    itemdiv.bind(MixIO.actionTags.BUTTON_SWITCH, function(event, status) {
        checkbox.prop('checked', !!status)
        MixIO.publish(topic.text(), (!!status) ? 1 : 0)
    })
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_button.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].feedbackMode + '</h5>'))
    var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
    var modeCheckbox = $("<input type='checkbox'>")
    modeCheckbox.click(function() {
        if (modeCheckbox.prop("checked"))
            editForm.find("img").attr("src", "icons/input_button2.svg")
        else
            editForm.find("img").attr("src", "icons/input_button.svg")
    })
    if (user_content == 2)
        modeCheckbox.prop("checked", true)
    else
        modeCheckbox.prop("checked", false)
    var modeCheckDiv = $("<div class='slider2 round'></div>")
    modeButton.append(modeCheckbox)
    modeButton.append(modeCheckDiv)
    var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center'/>")
    modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'>" + JSLang[lang].switch+"</span>"))
    modeDiv.append(modeButton)
    modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'>" + JSLang[lang].button + "</span>"))
    editForm.append(modeDiv)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        if (modeCheckbox.prop('checked')) {
                            title.parent().parent().attr('user-content', 2)
                            button.attr("hidden", "hidden")
                            button2.removeAttr("hidden")
                        } else {
                            title.parent().parent().attr('user-content', 0)
                            button2.attr("hidden", "hidden")
                            button.removeAttr("hidden")
                        }
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)

    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b;"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning) {
                bubble.append(editButton)
                bubble.append(deleteButton)
            }
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
}

function add_slider(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var sliderDiv = $("<div style='width:100%;display:flex;flex-direction:row;justify-content:center'/>")
    var slider = $("<input type='range' min='0' max='10' step='1' value='0'></input>")
    slider.on('input propertychange', () => {
        mark.val(slider.val())
        publish(topic.text(), slider.val())
        title.parent().parent().attr('user-content', slider.attr('min') + "," + slider.attr('max') + "," + slider.attr('step') + "," + slider.val())
        itemdiv.trigger(MixIO.eventTags.SLIDER_SLIDED)
    })
    var mark = $("<input style='width:20%;min-width:0!important;height:25px;line-height:25px;margin-top:5px;margin-bottom:5px;text-align:center;color:black;border:solid lightgray 2px;border-radius:5px;display:flex;align-items:center;justify-content:center;display:inline;margin-left:5px;border:solid gray 1px'></input>")
    mark.val(0)
    mark.on('change', function() {
        publish(topic.text(), mark.val())
        var val = parseFloat(mark.val())
        if (val >= slider.attr('min') && val <= slider.attr('max')) {
            slider.val(val)
            title.parent().parent().attr('user-content', slider.attr('min') + "," + slider.attr('max') + "," + slider.attr('step') + "," + slider.val())
        }
    })
    slider.bind('click', function(event) {
        event.stopPropagation()
    })
    slider.bind('pointerdown', function(event) {
        event.stopPropagation()
    })
    slider.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    slider.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    slider[0].addEventListener('touchstart', function(event) {
        event.stopPropagation()
    }, { passive: false })
    mark.bind('click', function(event) {
        event.stopPropagation()
    })
    mark.bind('pointerdown', function(event) {
        event.stopPropagation()
    })
    mark.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    mark.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    mark[0].addEventListener('touchstart', function(event) {
        event.stopPropagation()
    }, { passive: false })
    sliderDiv.append(slider)
    sliderDiv.append(mark)
    contents.push(sliderDiv)

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    attrs = [
        ['user-type', 'input_slider'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(3, 1, contents, attrs)
    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                if (!isNaN(parseFloat(message1))) {
                    var val = parseFloat(message1)
                    if (val >= slider.attr('min') && val <= slider.attr('max')) {
                        slider.val(val)
                        mark.val(val)
                        title.parent().parent().attr('user-content', slider.attr('min') + "," + slider.attr('max') + "," + slider.attr('step') + "," + slider.val())
                    }
                }
                itemdiv.trigger(MixIO.eventTags.SLIDER_CHANGED, [parseFloat(message1)])
            }
    })
    itemdiv.bind(MixIO.actionTags.SLIDER_SEND, function(event, val) {
        if (val >= slider.attr('min') && val <= slider.attr('max')) {
            slider.val(val)
            mark.val(val)
        }
        MixIO.publish(topic.text(), val)
    })
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:105px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_slider.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        if (!isNaN(parseFloat(minInput.val())) && !isNaN(parseFloat(maxInput.val())) && !isNaN(parseFloat(paceInput.val())) && (parseFloat(paceInput.val()) > 0) && (parseFloat(maxInput.val()) > parseFloat(minInput.val())) && ((parseFloat(maxInput.val()) - parseFloat(minInput.val())) > parseFloat(paceInput.val()))) {
                            title.parent().parent().attr('user-title', title_input.val())
                            title.parent().parent().attr('user-topic', topic_input.val())
                            slider.attr('min', minInput.val())
                            slider.attr('max', maxInput.val())
                            slider.attr('step', paceInput.val())
                            title.parent().parent().attr('user-content', slider.attr('min') + "," + slider.attr('max') + "," + slider.attr('step') + "," + slider.val())
                            title.text(title_input.val())
                            topic.text(topic_input.val())
                            modifyDia.close()
                        } else {
                            showtext(JSLang[lang].invalidSlideRange)
                        }
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var vals = user_content.split(',')
    slider.attr('min', vals[0])
    slider.attr('max', vals[1])
    slider.attr('step', vals[2])
    slider.val(vals[3])
    mark.val(vals[3])
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].slideRange + '</h5>'))
    var rangeDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center'/>")
    var minInput = $("<input placeholder='" + JSLang[lang].min + "' class='form-control' style='min-width:70px;width:70px'/>")
    rangeDiv.append(minInput)
    rangeDiv.append("<span style='margin-left:10px;margin-right:10px'>-</span>")
    var maxInput = $("<input placeholder='" + JSLang[lang].max + "' class='form-control' style='min-width:70px;width:70px'/>")
    rangeDiv.append(maxInput)
    rangeDiv.append($('<span style="margin-left:20px;margin-right:5px">' + JSLang[lang].step + '</span>'))
    var paceInput = $("<input placeholder='' class='form-control' style='min-width:70px;width:70px'/>")
    rangeDiv.append(paceInput)
    editForm.append(rangeDiv)
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            minInput.val(slider.attr('min'))
            maxInput.val(slider.attr('max'))
            paceInput.val(slider.attr('step'))
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_controller(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var controllerDiv = $("<div style='width:70%;height:70%;'/>")
    contents.push(controllerDiv)
    var controllerID = randomString() + 'con'
    controllerDiv.attr('id', controllerID)
    attrs = [
        ['user-type', 'input_controller'],
        ['user-title', user_title],
        ['user-content', "0,0"],
        ['user-topic', user_topic],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(2, 2, contents, attrs)
    var joy = new JoyStick(controllerID)
    controllerDiv.children().bind('click', function(event) {
        event.stopPropagation()
    })
    controllerDiv.children().bind('pointerdown', function(event) {
        event.stopPropagation()
    })
    controllerDiv.children().bind('mousedown', function(event) {
        event.stopPropagation()
    })
    var pressed = 0
    var minInterval = 500
    setInterval(function() {
        if (pressed == 1) {
            var parseX = parseInt(joy.GetX() / 110 * 100 > 100 ? 100 : ((parseInt(joy.GetX() / 110 * 100) < -100) ? -100 : parseInt(joy.GetX() / 110 * 100)))
            var parseY = parseInt(joy.GetY() / 110 * 100 > 100 ? 100 : ((parseInt(joy.GetY() / 110 * 100) < -100) ? -100 : parseInt(joy.GetY() / 110 * 100)))
            publish(topic.text(), parseX + "," + parseY)
            title.parent().parent().attr('user-content', parseX + "," + parseY)
            itemdiv.trigger(MixIO.eventTags.JOYSTICK_CHANGED, [parseX, parseY])
        }
    }, minInterval)
    itemdiv.bind(MixIO.actionTags.JOYSTICK_SEND, function(event, x, y) {
        publish(topic.text(), x + "," + y)
    })
    controllerDiv.children()[0].addEventListener("mousedown", function() {
        pressed = 1
    }, false);
    controllerDiv.children()[0].addEventListener("mouseup", function() {
        pressed = 0
        title.parent().parent().attr('user-content', "0,0")
        publish(topic.text(), "0,0")
    }, false);
    controllerDiv.children()[0].addEventListener("touchstart", function() {
        pressed = 1
    }, false);
    controllerDiv.children()[0].addEventListener("touchend", function() {
        pressed = 0
        title.parent().parent().attr('user-content', "0,0")
        publish(topic.text(), "0,0")
    }, false);

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_controller.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        title.parent().parent().attr('user-content', "0,0")
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_keyboard(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    attrs = [
        ['user-type', 'input_keyboard'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var keyDiv = $("<div style='width:100%;display:flex;flex-direction:row;justify-content:center;align-items:center'/>")
    var messDiv = $("<input class='form-control' style='width:calc(100% - 85px);min-width:0px'/>")
    messDiv.val(stringendecoder.decodeHtml(user_content))
    messDiv.click(function(event) {
        event.stopPropagation()
    })
    messDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    messDiv.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    messDiv.bind('input', function() {
        title.parent().parent().attr('user-content', stringendecoder.encodeHtml(messDiv.val()))
    })
    keyDiv.append(messDiv)
    var sendIcon = $('<a class="btn btn-primary btn-circle" style="margin-left:10px"><i class="fa fa-paper-plane"></i></a')
    keyDiv.append(sendIcon)
    sendIcon.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    sendIcon.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    if (window.screen.width > 800)
        sendIcon.bind('click', function(event) {
            event.stopPropagation()
            publish(topic.text(), messDiv.val())
            sendIcon.removeClass("btn-primary")
            sendIcon.addClass("btn-success")
            sendIcon.children().removeClass('fa-paper-plane')
            sendIcon.children().addClass("fa-check")
            setTimeout(function() {
                sendIcon.removeClass("btn-success")
                sendIcon.addClass("btn-primary")
                sendIcon.children().removeClass('fa-check')
                sendIcon.children().addClass("fa-paper-plane")
            }, 300)
            itemdiv.trigger(MixIO.eventTags.KEYBOARD_SENT, messDiv.val())
        })
    else
        sendIcon.bind('touchend', function(event) {
            event.stopPropagation()
            publish(topic.text(), messDiv.val())
            sendIcon.removeClass("btn-primary")
            sendIcon.addClass("btn-success")
            sendIcon.children().removeClass('fa-paper-plane')
            sendIcon.children().addClass("fa-check")
            setTimeout(function() {
                sendIcon.removeClass("btn-success")
                sendIcon.addClass("btn-primary")
                sendIcon.children().removeClass('fa-check')
                sendIcon.children().addClass("fa-paper-plane")
            }, 300)
            itemdiv.trigger(MixIO.eventTags.KEYBOARD_SENT, messDiv.val())
        })
    contents.push(keyDiv)
    var itemdiv = add_block(3, 1, contents, attrs)
    itemdiv.bind(MixIO.actionTags.KEYBOARD_SEND, function(event, message) {
        messDiv.val(message)
        publish(topic.text(), messDiv.val())
        sendIcon.removeClass("btn-primary")
        sendIcon.addClass("btn-success")
        sendIcon.children().removeClass('fa-paper-plane')
        sendIcon.children().addClass("fa-check")
        setTimeout(function() {
            sendIcon.removeClass("btn-success")
            sendIcon.addClass("btn-primary")
            sendIcon.children().removeClass('fa-check')
            sendIcon.children().addClass("fa-paper-plane")
        }, 300)
    })

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_keyboard.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        if (title.parent().parent().attr('user-content') == undefined)
                            title.parent().parent().attr('user-content', "")
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)

}

function add_tinydb(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    attrs = [
        ['user-type', 'tinydb'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var keyDiv = $("<div style='width:100%;display:flex;flex-direction:row;justify-content:center;align-items:center'/>")
    var messDiv = $("<select class='form-control' style='width:calc(100% - 85px);min-width:0px'/>")
    var options = user_content.split(',')
    for (var i = 0; i < options.length; i++) {
        var option = $("<option value='" + options[i] + "'>" + options[i] + "</option>")
        messDiv.append(option)
    }
    keyDiv.append(messDiv)
    messDiv.click(function(event) {
        event.stopPropagation()
    })
    messDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    messDiv.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    var sendIcon = $('<a class="btn btn-primary btn-circle" style="margin-left:10px"><i class="fa fa-paper-plane"></i></a')
    keyDiv.append(sendIcon)
    sendIcon.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    sendIcon.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    if (window.screen.width > 800)
        sendIcon.bind('click', function(event) {
            event.stopPropagation()
            publish(topic.text(), messDiv.val())
            sendIcon.removeClass("btn-primary")
            sendIcon.addClass("btn-success")
            sendIcon.children().removeClass('fa-paper-plane')
            sendIcon.children().addClass("fa-check")
            setTimeout(function() {
                sendIcon.removeClass("btn-success")
                sendIcon.addClass("btn-primary")
                sendIcon.children().removeClass('fa-check')
                sendIcon.children().addClass("fa-paper-plane")
            }, 300)
        })
    else
        sendIcon.bind('touchend', function(event) {
            event.stopPropagation()
            publish(topic.text(), messDiv.val())
            sendIcon.removeClass("btn-primary")
            sendIcon.addClass("btn-success")
            sendIcon.children().removeClass('fa-paper-plane')
            sendIcon.children().addClass("fa-check")
            setTimeout(function() {
                sendIcon.removeClass("btn-success")
                sendIcon.addClass("btn-primary")
                sendIcon.children().removeClass('fa-check')
                sendIcon.children().addClass("fa-paper-plane")
            }, 300)
        })
    contents.push(keyDiv)
    var itemdiv = add_block(3, 1, contents, attrs)
    itemdiv.bind(MixIO.actionTags.KEYBOARD_SEND, function(event, message) {
        messDiv.val(message)
        publish(topic.text(), messDiv.val())
        sendIcon.removeClass("btn-primary")
        sendIcon.addClass("btn-success")
        sendIcon.children().removeClass('fa-paper-plane')
        sendIcon.children().addClass("fa-check")
        setTimeout(function() {
            sendIcon.removeClass("btn-success")
            sendIcon.addClass("btn-primary")
            sendIcon.children().removeClass('fa-check')
            sendIcon.children().addClass("fa-paper-plane")
        }, 300)
    })

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_keyboard.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].options + '</h5>'))
    var options_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var options_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    options_input_div.append(options_input)
    editForm.append(options_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        title.parent().parent().attr('user-content', options_input.val())
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        messDiv.empty()
                        var options = options_input.val().split(',')
                        for (var i = 0; i < options.length; i++) {
                            var option = $("<option value='" + options[i] + "'>" + options[i] + "</option>")
                            messDiv.append(option)
                        }
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            options_input.val(title.parent().parent().attr('user-content'))
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)

}

function add_mic(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var isRecording = false
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    attrs = [
        ['user-type', 'input_mic'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var keyDiv = $("<div style='width:100%;display:flex;flex-direction:row;justify-content:center;align-items:center'/>")
    var messDiv = $("<input class='form-control' readonly style='width:calc(100% - 85px);min-width:0px'/>")
    messDiv.val(stringendecoder.decodeHtml(user_content))
    messDiv.click(function(event) {
        event.stopPropagation()
    })
    messDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    messDiv.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    messDiv.bind('input', function() {
        title.parent().parent().attr('user-content', stringendecoder.encodeHtml(messDiv.val()))
    })
    keyDiv.append(messDiv)
    var sendIcon = $('<a class="btn btn-primary btn-circle" style="margin-left:10px"><i class="fa fa-microphone"></i></a')
    keyDiv.append(sendIcon)
    sendIcon.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    sendIcon.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    if (window.screen.width > 800)
        sendIcon.bind('click', function(event) {
            event.stopPropagation()
            if(!isRecording)
            {
                sendIcon.removeClass("btn-primary")
                sendIcon.addClass("btn-danger")
                sendIcon.children().removeClass('fa-microphone')
                sendIcon.children().addClass("fa-stop")
                // start recording, use web speech api
                recognition = new webkitSpeechRecognition();
                recognition.lang = 'zh-CN';
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.start();
                recognition.onresult = function(event) {
                    // update the result
                    var recordRes = ''
                    for(var i = 0; i < event.results.length; i++)
                        recordRes += event.results[i][0].transcript
                    messDiv.val(recordRes)
                }
                isRecording = true
            }
            else
            {
                sendIcon.removeClass("btn-danger")
                sendIcon.addClass("btn-primary")
                sendIcon.children().removeClass('fa-stop')
                sendIcon.children().addClass("fa-microphone")
                recognition.stop();
                publish(topic.text(), messDiv.val())
                isRecording = false
            }
        })
    else
        sendIcon.bind('touchend', function(event) {
            event.stopPropagation()
            if(!isRecording)
            {
                sendIcon.removeClass("btn-primary")
                sendIcon.addClass("btn-danger")
                sendIcon.children().removeClass('fa-microphone')
                sendIcon.children().addClass("fa-stop")
                // start recording, use web speech api
                recognition = new webkitSpeechRecognition();
                recognition.lang = 'zh-CN';
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.start();
                recognition.onresult = function(event) {
                    // update the result
                    var recordRes = ''
                    for(var i = 0; i < event.results.length; i++)
                        recordRes += event.results[i][0].transcript
                    messDiv.val(recordRes)
                }
                isRecording = true

            }
            else
            {
                sendIcon.removeClass("btn-danger")
                sendIcon.addClass("btn-primary")
                sendIcon.children().removeClass('fa-stop')
                sendIcon.children().addClass("fa-microphone")
                recognition.stop();
                publish(topic.text(), messDiv.val())
                isRecording = false
            }
        })
    contents.push(keyDiv)
    var itemdiv = add_block(3, 1, contents, attrs)

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/mic.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        if (title.parent().parent().attr('user-content') == undefined)
                            title.parent().parent().attr('user-content', "")
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)

}

function add_bulb(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var bulb = $("<div class='bulb0'/>")
    contents.push(bulb)
    if (user_content == 0)
        bulb.attr('class', 'bulb0')
    else if (user_content == 1)
        bulb.attr('class', 'bulb1')
    else if (user_content == 2)
        bulb.attr('class', 'bulb2')
    else if (user_content == 2)
        bulb.attr('class', 'bulb3')
    attrs = [
        ['user-type', 'output_bulb'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(1, 1, contents, attrs)
    itemdiv.bind(MixIO.actionTags.BULB_CHANGE, function(event, status) {
        MixIO.publish(topic.text(), status)
    })
    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                if (message1 == 0) {
                    title.parent().parent().attr('user-content', 0)
                    bulb.attr('class', 'bulb0')
                } else if (message1 == 1) {
                    title.parent().parent().attr('user-content', 1)
                    bulb.attr('class', 'bulb1')
                } else if (message1 == 2) {
                    title.parent().parent().attr('user-content', 2)
                    bulb.attr('class', 'bulb2')
                } else if (message1 == 3) {
                    title.parent().parent().attr('user-content', 3)
                    bulb.attr('class', 'bulb3')
                }
                itemdiv.trigger(MixIO.eventTags.BULB_CHANGED, [Uint8ArrayToString(message1)])
            }
    })

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_bulb.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        if (title.parent().parent().attr('user-content') == undefined)
                            title.parent().parent().attr('user-content', "")
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_ble(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    if(user_style != undefined)
        user_content = JSLang[lang].select
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    attrs = [
        ['user-type', 'ble'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var bletarget = user_content
    var bleconnect = function(){
        if(bletarget != JSLang[lang].select)
        {
            var ble = globalBLE[bletarget]
            console.log(ble)
            ble.addEventListener('gattserverdisconnected', function() {
                showtext("Bluetooth Disconnected")
                clearInterval(blink)
                ble_icon.css('color', '#E74A3B')
                delete globalBLE[bletarget]
                bletarget = JSLang[lang].select
                ble_target.val(JSLang[lang].select)
                title.parent().parent().attr('user-content', JSLang[lang].select)
            })
            var blinkStatus = false
            var blink = setInterval(function() {
                ble_icon.css('color', blinkStatus ? '#858796' : '#4e73df')
                blinkStatus = !blinkStatus
            }, 500)
            ble.gatt.connect().then(function(server) {
                console.log(server)
                var Rok = false
                var Tok = false
                var serviceUuid = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
                var uartRxCharacteristicUuid = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
                var uartTxCharacteristicUuid = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
                server.getPrimaryService(serviceUuid).then(function(service) {
                    service.getCharacteristic(uartRxCharacteristicUuid).then(function(uartRxCharacteristic) {
                        Rok = true
                        if (Rok && Tok) {
                            clearInterval(blink)
                            ble_icon.css('color', '#4e73df')
                        }
                        client.on('message', function(topic1, message1) {
                            if(isAlive && topic1.split("/")[(isMixly ? 3 : 2)] == topic.text().split(",")[1])
                            {
                                var encoder = new TextEncoder('utf-8');
                                uartRxCharacteristic.writeValue(encoder.encode(message1))
                                ble_icon.css('color', '#1cc88a')
                                    setTimeout(function() {
                                        ble_icon.css('color', '#36b9cc')
                                    }, 300)
                            }
                        })
                    }).catch(function(error) {
                        clearInterval(blink)
                        showtext(error)
                        console.log(error)
                        ble_icon.css('color', '#E74A3B')
                        delete globalBLE[bletarget]
                        bletarget = JSLang[lang].select
                        ble_target.val(JSLang[lang].select)
                        title.parent().parent().attr('user-content', JSLang[lang].select)
                    })
                    service.getCharacteristic(uartTxCharacteristicUuid).then(function(uartTxCharacteristic) {
                        console.log(uartTxCharacteristic)
                        uartTxCharacteristic.startNotifications().then(function() {
                            Tok = true
                            if (Rok && Tok) {
                                clearInterval(blink)
                                ble_icon.css('color', '#4e73df')
                            }
                            uartTxCharacteristic.addEventListener('characteristicvaluechanged', function(event) {
                                // get data
                                var decoder = new TextDecoder('utf-8');
                                var value = decoder.decode(event.target.value);
                                if(isAlive)
                                {
                                    publish(topic.text().split(",")[0], value)
                                    ble_icon.css('color', '#1cc88a')
                                    setTimeout(function() {
                                        ble_icon.css('color', '#4e73df')
                                    }, 300)
                                }
                            })
                        }).catch(function(error) {
                            clearInterval(blink)
                            showtext(error)
                            console.log(error)
                            ble_icon.css('color', '#E74A3B')
                            delete globalBLE[bletarget]
                            bletarget = JSLang[lang].select
                            ble_target.val(JSLang[lang].select)
                            title.parent().parent().attr('user-content', JSLang[lang].select)
                        })
                    }).catch(function(error) {
                        clearInterval(blink)
                        showtext(error)
                        console.log(error)
                        ble_icon.css('color', '#E74A3B')
                        delete globalBLE[bletarget]
                        bletarget = JSLang[lang].select
                        ble_target.val(JSLang[lang].select)
                        title.parent().parent().attr('user-content', JSLang[lang].select)
                    })
                }).catch(function(error) {
                    clearInterval(blink)
                    showtext(error)
                    console.log(error)
                    ble_icon.css('color', '#E74A3B')
                    delete globalBLE[bletarget]
                    bletarget = JSLang[lang].select
                    ble_target.val(JSLang[lang].select)
                    title.parent().parent().attr('user-content', JSLang[lang].select)
                })
            }).catch(function(error) {
                clearInterval(blink)
                showtext(error)
                console.log(error)
                ble_icon.css('color', '#E74A3B')
                delete globalBLE[bletarget]
                bletarget = JSLang[lang].select
                ble_target.val(JSLang[lang].select)
                title.parent().parent().attr('user-content', JSLang[lang].select)
            })
        }
        else
        {
            ble_icon.css('color', '#858796')
        }
    }
    
    var icon_div = $('<div style="display:flex;flex-direction:row;align-items:center;justify-content:center"/>')
    var ble_icon = $('<i class="fa fa-bluetooth-b" style="font-size:40px;color:#858796"></i>')
    icon_div.append(ble_icon)
    contents.push(icon_div)
    var itemdiv = add_block(1, 1, contents, attrs)
    bleconnect()

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/ble.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].readMessTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].writeMessTopic + '</h5>'))
    var topic_input_div_2 = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input_2 = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div_2.append(topic_input_2)
    editForm.append(topic_input_div_2)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].bleTarget + '</h5>'))
    var ble_target_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var ble_target = $("<input class='form-control form-control-user'  style='text-align:center;cursor:pointer' readonly/>")
    ble_target.val(JSLang[lang].select)
    ble_target_div.append(ble_target)
    ble_target.click(function() {
        // use web bluetooth to select device, no filter
        if (navigator.bluetooth) {
            navigator.bluetooth.requestDevice({
                acceptAllDevices: true,
                // read and write to device characteristic (for example, to send data to a micro:bit)
                optionalServices: ['6e400001-b5a3-f393-e0a9-e50e24dcca9e', '6e400002-b5a3-f393-e0a9-e50e24dcca9e', '6e400003-b5a3-f393-e0a9-e50e24dcca9e']
            }).then(function(device) {
                var old_ble_target = ble_target.val()
                if(old_ble_target != JSLang[lang].select)
                {
                    globalBLE[old_ble_target].gatt.disconnect()
                    delete globalBLE[old_ble_target]
                }
                ble_target.val(device.name + ' (' + device.id + ')')
                globalBLE[device.name + ' (' + device.id + ')'] = device
            }).catch(function(error) {
                var old_ble_target = ble_target.val()
                // if user cancel the selection(NotFoundError)
                if(error.name == "NotFoundError")
                {
                    if(old_ble_target != JSLang[lang].select)
                    {
                        globalBLE[old_ble_target].gatt.disconnect()
                        delete globalBLE[old_ble_target]
                    }
                    ble_target.val(JSLang[lang].select)
                    title.parent().parent().attr('user-content', JSLang[lang].select)
                }
                else
                    showtext(error)
            })
        } else {
            showtext(JSLang[lang].noWebBluetooth)
        }
    })
    editForm.append(ble_target_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11 && getByteLen(topic_input_2.val()) > 0 && getByteLen(topic_input_2.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        title.parent().parent().attr('user-content', ble_target.val())
                        bletarget = ble_target.val()
                        title.text(title_input.val())
                        topic.text(topic_input.val() + "," + topic_input_2.val())
                        modifyDia.close()
                        bleconnect()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text().split(",")[0])
            topic_input_2.val(topic.text().split(",")[1])
            ble_target.val(bletarget)
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_magic(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var bgColor = user_content
    var title = $("<h4 class='userTitle' style='background-color: " + bgColor + ";color:white;text-align:center;width:100%;position:absolute;top:0;left:0;height:40px;font-size:1.25rem;padding-top:10px;box-shadow:0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important'>" + user_title + "</h4>")
    var transparentDiv = $('<div style="width:100%;height:100%;position:absolute;top:0;left:0;background-color:rgba(0,0,0,0);z-index:-9999"/>')
    contents.push(title)
    contents.push(transparentDiv)
    attrs = [
        ['user-type', 'magic'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(5, 5, contents, attrs)
    itemdiv.css('background-color', 'rgba(0,0,0,0)')
    itemdiv.css('box-shadow', user_content + ' 10px 10px 20px')

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/magic.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="text-align:center;margin-top:15px">' + JSLang[lang].color + '</h5>'))
    var color_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var color_select = $('<select class="form-control form-control-user" style="text-align:center"/>')
    color_select.append($('<option value="#4e73df">' + JSLang[lang].blue + '</option>'))
    color_select.append($('<option value="#1cc88a">' + JSLang[lang].green + '</option>'))
    color_select.append($('<option value="#36b9cc">' + JSLang[lang].cyan + '</option>'))
    color_select.append($('<option value="#f6c23e">' + JSLang[lang].yellow + '</option>'))
    color_select.append($('<option value="#e74a3b">' + JSLang[lang].red + '</option>'))
    color_select.append($('<option value="#858796">' + JSLang[lang].gray + '</option>'))
    color_input_div.append(color_select)
    editForm.append(color_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (true)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', "")
                        title.parent().parent().attr('user-content', color_select.val())
                        bgColor = color_select.val()
                        title.css('background-color', bgColor)
                        itemdiv.css('box-shadow', bgColor + ' 10px 10px 20px')
                        title.text(title_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            color_select.val(bgColor)
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_timer(user_title, user_topic, user_content, user_style, title_style, isObserve) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic.split("$$$")[0] + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var bulb = $("<img src='icons/timer.svg' style='width:50%;height:50%'></img>")
    contents.push(bulb)
    attrs = [
        ['user-type', 'timer'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var triggerTopic = user_topic.split("$$$")[0]
    var triggerMessage = user_topic.split("$$$")[1]
    var triggerInterval = parseInt(user_content.split(",")[0])
    var triggerTimes = parseInt(user_content.split(",")[1])
    var itemdiv = add_block(1, 1, contents, attrs)
    MixIO.triggers[title.text()] = function() {
        var localTime = 0
        MixIO.setInterval(function() {
            if (triggerTimes == 0 || localTime < triggerTimes) {
                itemdiv.addClass("triggered")
                setTimeout(function() {
                    itemdiv.removeClass("triggered")
                }, 150)
                MixIO.publish(triggerTopic, triggerMessage)
                localTime = localTime + 1
            }
        }, triggerInterval)
    }
    MixIO.triggersToPreCode()
    if(!isObserve)
        MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))
    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        delete MixIO.triggers[title.text()]
        MixIO.triggersToPreCode()
        MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/timer.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerMessage + '</h5>'))
    var message_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var message_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    message_input_div.append(message_input)
    editForm.append(message_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerInterval + '</h5>'))
    var trigger_interval_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var trigger_interval = $("<input type='number' step='100' min='500' max='100000' required class='form-control form-control-user'  style='text-align:center'/>")
    trigger_interval_div.append(trigger_interval)
    editForm.append(trigger_interval_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].triggerTimes + '</h5>'))
    var trigger_times_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var trigger_times = $("<input type='number' step='1' min='0' max='100000' class='form-control form-control-user'  style='text-align:center'/>")
    trigger_times_div.append(trigger_times)
    editForm.append(trigger_times_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (getByteLen(message_input.val()) > 0) {
                    if (true) {
                        if (parseInt(trigger_interval.val()) && parseInt(trigger_interval.val()) >= 500) {
                            if (!isNaN(parseInt(trigger_times.val())) && parseInt(trigger_times.val()) >= 0) {
                                var oldKey = title.text()
                                title.parent().parent().attr('user-title', title_input.val())
                                title.parent().parent().attr('user-topic', topic_input.val() + "$$$" + message_input.val())
                                title.parent().parent().attr('user-content', trigger_interval.val() + "," + trigger_times.val())
                                title.text(title_input.val())
                                topic.text(topic_input.val())
                                triggerTopic = topic_input.val()
                                triggerMessage = message_input.val()
                                triggerInterval = trigger_interval.val()
                                triggerTimes = trigger_times.val()
                                if (title.text() != oldKey) {
                                    MixIO.triggers[title.text()] = MixIO.triggers[oldKey]
                                    delete MixIO.triggers[oldKey]
                                }
                                MixIO.triggersToPreCode()
                                MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))
                                modifyDia.close()
                            } else
                                showtext(JSLang[lang].illegalTimes)
                        } else
                            showtext(JSLang[lang].illegalInterval)
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext(JSLang[lang].messageLenIllegal)
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            message_input.val(triggerMessage)
            trigger_interval.val(triggerInterval)
            trigger_times.val(triggerTimes)
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_trigger(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic.split("$$$")[0] + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var bulb = $("<img src='icons/trigger.svg' style='width:50%;height:50%'></img>")
    contents.push(bulb)
    attrs = [
        ['user-type', 'trigger'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var condition1_1 = user_content.split("$$$")[0]
    var condition1_2 = user_content.split("$$$")[1]
    var condition2_1 = user_content.split("$$$")[2]
    var condition2_2 = user_content.split("$$$")[3]
    var conditionRelation = user_content.split("$$$")[4]
    var dstTopic = user_content.split("$$$")[5]
    var dstMessage = user_content.split("$$$")[6]
    var itemdiv = add_block(1, 1, contents, attrs)
    var relationLogic = function(message, condition_1, condition_2) {
        var condition_2 = parseFloat(condition_2)
        if (condition_1 == ">")
            return message > condition_2
        else if (condition_1 == "≥")
            return message >= condition_2
        else if (condition_1 == "<")
            return message < condition_2
        else if (condition_1 == "≤")
            return message <= condition_2
        else if (condition_1 == "=")
            return message == condition_2
        else if (condition_1 == "≠")
            return message != condition_2
        else if (condition_1 == "--")
            return true
    }
    MixIO.triggers[title.text()] = function() {
        MixIO.onMessage(function(topic1, message) {
            var message = String(message)
            if (topic1 == topic.text()) {
                if (conditionRelation == "AND") {
                    if (relationLogic(message, condition1_1, condition1_2) && relationLogic(message, condition2_1, condition2_2)) {
                        itemdiv.addClass("triggered")
                        setTimeout(function() {
                            itemdiv.removeClass("triggered")
                        }, 150)
                        MixIO.publish(dstTopic, dstMessage)
                    } else {
                        itemdiv.addClass("imtriggered")
                        setTimeout(function() {
                            itemdiv.removeClass("imtriggered")
                        }, 150)
                    }
                } else if (conditionRelation == "OR") {
                    if (relationLogic(message, condition1_1, condition1_2) || relationLogic(message, condition2_1, condition2_2)) {
                        itemdiv.addClass("triggered")
                        setTimeout(function() {
                            itemdiv.removeClass("triggered")
                        }, 150)
                        MixIO.publish(dstTopic, dstMessage)
                    } else {
                        itemdiv.addClass("imtriggered")
                        setTimeout(function() {
                            itemdiv.removeClass("imtriggered")
                        }, 150)
                    }
                } else if (conditionRelation == "XOR") {
                    if (relationLogic(message, condition1_1, condition1_2) ^ relationLogic(message, condition2_1, condition2_2)) {
                        itemdiv.addClass("triggered")
                        setTimeout(function() {
                            itemdiv.removeClass("triggered")
                        }, 150)
                        MixIO.publish(dstTopic, dstMessage)
                    } else {
                        itemdiv.addClass("imtriggered")
                        setTimeout(function() {
                            itemdiv.removeClass("imtriggered")
                        }, 150)
                    }
                }
            }
        })
    }
    MixIO.triggersToPreCode()
    MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        delete MixIO.triggers[title.text()]
        MixIO.triggersToPreCode()
        MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/trigger.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center' autofocus='autofocus'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].srcTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].condition + '1</h5>'))
    var condition1_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var condition1_input1 = $("<select class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-right:5px'/>")
    condition1_input1.append($("<option value='\>'>\></option>"))
    condition1_input1.append($("<option value='≥'>\≥</option>"))
    condition1_input1.append($("<option value='\<'>\<</option>"))
    condition1_input1.append($("<option value='≤'>\≤</option>"))
    condition1_input1.append($("<option value='\='>\=</option>"))
    condition1_input1.append($("<option value='≠'>≠</option>"))
    var condition1_input2 = $("<input class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-left:5px'/>")
    condition1_input_div.append(condition1_input1)
    condition1_input_div.append(condition1_input2)
    editForm.append(condition1_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].condition + '2</h5>'))
    var condition2_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var condition2_input1 = $("<select class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-right:5px'/>")
    condition2_input1.append($("<option value='--'>--</option>"))
    condition2_input1.append($("<option value='\>'>\></option>"))
    condition2_input1.append($("<option value='≥'>\≥</option>"))
    condition2_input1.append($("<option value='\<'>\<</option>"))
    condition2_input1.append($("<option value='≤'>\≤</option>"))
    condition2_input1.append($("<option value='\='>\=</option>"))
    condition2_input1.append($("<option value='≠'>≠</option>"))
    var condition2_input2 = $("<input disabled class='form-control form-control-user'  style='text-align:center;width:120px!important;min-width:120px!important;margin-left:5px'/>")
    condition2_input_div.append(condition2_input1)
    condition2_input_div.append(condition2_input2)
    editForm.append(condition2_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].conditionRelation + '</h5>'))
    var condition_relation_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var condition_relation = $("<select class='form-control form-control-user'  style='text-align:center'/>")
    condition_relation.append($("<option value='AND'>AND</option>"))
    condition_relation.append($("<option value='OR'>OR</option>"))
    condition_relation.append($("<option value='XOR'>XOR</option>"))
    condition_relation_div.append(condition_relation)
    editForm.append(condition_relation_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].dstTopic + '</h5>'))
    var dstTopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var dstTopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    dstTopic_input_div.append(dstTopic_input)
    editForm.append(dstTopic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].dstMessage + '</h5>'))
    var dstMessage_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var dstMessage_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    dstMessage_input_div.append(dstMessage_input)
    editForm.append(dstMessage_input_div)
    condition2_input1.bind("change", function() {
        if (condition2_input1.val() == "--")
            condition2_input2.attr("disabled", "disabled")
        else
            condition2_input2.removeAttr("disabled")
    })
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (getByteLen(condition1_input2.val()) > 0 && (condition2_input1.val() == "--" || getByteLen(condition2_input2.val()) > 0)) {
                    if (true) {
                        if (getByteLen(dstTopic_input.val()) > 0) {
                            if (getByteLen(dstMessage_input.val()) > 0) {
                                var oldKey = title.text()
                                title.parent().parent().attr('user-title', title_input.val())
                                title.parent().parent().attr('user-topic', topic_input.val())
                                title.parent().parent().attr('user-content', [condition1_input1.val(), condition1_input2.val(), condition2_input1.val(), condition2_input2.val(), condition_relation.val(), dstTopic_input.val(), dstMessage_input.val()].join("$$$"))
                                title.text(title_input.val())
                                topic.text(topic_input.val())
                                condition1_1 = condition1_input1.val()
                                condition1_2 = condition1_input2.val()
                                condition2_1 = condition2_input1.val()
                                condition2_2 = condition2_input2.val()
                                conditionRelation = condition_relation.val()
                                dstTopic = dstTopic_input.val()
                                dstMessage = dstMessage_input.val()
                                if (title.text() != oldKey) {
                                    MixIO.triggers[title.text()] = MixIO.triggers[oldKey]
                                    delete MixIO.triggers[oldKey]
                                }
                                MixIO.triggersToPreCode()
                                MixIO.editor.setValue(MixIO.preCode + Blockly.JavaScript.workspaceToCode(workspace))
                                modifyDia.close()
                            } else
                                showtext(JSLang[lang].dstMessageLenIllegal)
                        } else
                            showtext(JSLang[lang].dstTopicLenIllegal)
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext(JSLang[lang].conditionLenIllegal)
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            condition1_input1.val(condition1_1)
            condition1_input2.val(condition1_2)
            condition2_input1.val(condition2_1)
            condition2_input2.val(condition2_2)
            condition_relation.val(conditionRelation)
            dstTopic_input.val(dstTopic)
            dstMessage_input.val(dstMessage)
            if (condition2_input1.val() == "--")
                condition2_input2.attr("disabled", "disabled")
            else
                condition2_input2.removeAttr("disabled")
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_rgb(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div style='margin-top:5px;margin-bottom:5px;font-size:0.75rem'/>")
    var Rtopic = $("<span class='index-topic' style='margin:0;color:#858796;;margin-right:10px'>" + user_topic.split('/')[0] + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#e74a3b;margin-right:3px'></i>"))
    topicDiv.append(Rtopic)
    var Gtopic = $("<span class='index-topic' style='margin:0;color:#858796;;margin-right:10px'>" + user_topic.split('/')[1] + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#1cc88a;margin-right:3px'></i>"))
    topicDiv.append(Gtopic)
    var Btopic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic.split('/')[2] + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#4e73df;margin-right:3px'></i>"))
    topicDiv.append(Btopic)
    var pickerID = randomString() + 'rgb'
    var pickerRGBDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center'/>")
    var pickerDiv = $("<div/>")
    pickerDiv.attr('id', pickerID)
    pickerDiv.bind('click', function(event) {
        event.stopPropagation()
        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
        publish(Rtopic.text(), RInput.val())
        publish(Gtopic.text(), GInput.val())
        publish(Btopic.text(), BInput.val())
        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_PICKED, [RInput.val(), GInput.val(), BInput.val()])
    })
    pickerDiv.bind('pointerdown', function(event) {
        event.stopPropagation()
    })
    pickerDiv[0].addEventListener('touchstart', function(event) {
        event.stopPropagation()
        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
        publish(Rtopic.text(), RInput.val())
        publish(Gtopic.text(), GInput.val())
        publish(Btopic.text(), BInput.val())
        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_PICKED, [RInput.val(), GInput.val(), BInput.val()])
    })
    pickerDiv[0].addEventListener('touchend', function(event) {
        event.stopPropagation()
        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
        publish(Rtopic.text(), RInput.val())
        publish(Gtopic.text(), GInput.val())
        publish(Btopic.text(), BInput.val())
        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_PICKED, [RInput.val(), GInput.val(), BInput.val()])
    })
    pickerDiv.css("transform", "scale(0.8)")
    var RGBDiv = $("<div style='color:black;margin-right:10px;display:flex;flex-direction:column;align-items:center'/>")
    var colorDiv = $("<input class='form-control' style='width:30px;height:30px;margin-bottom:8px;padding:3px;min-width:0px;background-color:black' readonly>")
    colorDiv.attr('id', pickerID + 'cl')
    contents.push(colorDiv)
    var RDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:5px;margin-bottom:5px'/>")
    var GDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:5px;margin-bottom:5px'/>")
    var BDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center;margin-top:5px;margin-bottom:5px'/>")
    RDiv.append($("<p style='margin-bottom:0;margin-right:10px;color:#e74a3b;'>R</p>"))
    GDiv.append($("<p style='margin-bottom:0;margin-right:10px;color:#1cc88a;'>G</p>"))
    BDiv.append($("<p style='margin-bottom:0;margin-right:10px;color:#4e73df;'>B</p>"))
    var RInput = $("<input class='form-control' style='width:45px;padding:3px;min-width:0px' readonly>")
    var GInput = $("<input class='form-control' style='width:45px;padding:3px;min-width:0px' readonly>")
    var BInput = $("<input class='form-control' style='width:45px;padding:3px;min-width:0px' readonly>")
    RInput.val(user_content.split(',')[0])
    GInput.val(user_content.split(',')[1])
    BInput.val(user_content.split(',')[2])
    RDiv.append(RInput)
    GDiv.append(GInput)
    BDiv.append(BInput)
    RGBDiv.append(RDiv)
    RGBDiv.append(GDiv)
    RGBDiv.append(BDiv)
    pickerRGBDiv.append(pickerDiv)
    pickerRGBDiv.append(RGBDiv)
    contents.push(pickerRGBDiv)
    attrs = [
        ['user-type', 'input_rgb'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(3, 3, contents, attrs)
    itemdiv.bind(MixIO.actionTags.RGB_PICKER_SEND, function(event, r, g, b) {
        MixIO.publish(Rtopic.text(), r)
        MixIO.publish(Gtopic.text(), g)
        MixIO.publish(Btopic.text(), b)
    })
    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == Rtopic.text()) {
                if (!isNaN(parseInt(message1))) {
                    var val = parseInt(message1)
                    if (val >= 0 && val <= 255) {
                        RInput.val(val)
                        $.farbtastic(far).setColor(RGB2Hex(parseInt(RInput.val()), parseInt(GInput.val()), parseInt(BInput.val())))
                        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
                        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_CHANGED, [val, -1, -1])
                    }
                }
            }
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == Gtopic.text()) {
                if (!isNaN(parseInt(message1))) {
                    var val = parseInt(message1)
                    if (val >= 0 && val <= 255) {
                        GInput.val(val)
                        $.farbtastic(far).setColor(RGB2Hex(parseInt(RInput.val()), parseInt(GInput.val()), parseInt(BInput.val())))
                        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
                        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_CHANGED, [-1, val, -1])
                    }
                }
            }
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == Btopic.text()) {
                if (!isNaN(parseInt(message1))) {
                    var val = parseInt(message1)
                    if (val >= 0 && val <= 255) {
                        BInput.val(val)
                        $.farbtastic(far).setColor(RGB2Hex(parseInt(RInput.val()), parseInt(GInput.val()), parseInt(BInput.val())))
                        title.parent().parent().attr('user-content', RInput.val() + "," + GInput.val() + "," + BInput.val())
                        itemdiv.trigger(MixIO.eventTags.RGB_PICKER_CHANGED, [-1, -1, val])
                    }
                }
            }
    })
    var far = $("#" + pickerID).farbtastic(function(color) {
        $('#' + pickerID + 'cl').css('background-color', color)
        RInput.val(HEX2RGB(color)[0])
        GInput.val(HEX2RGB(color)[1])
        BInput.val(HEX2RGB(color)[2])
    })
    $.farbtastic(far).setColor(RGB2Hex(parseInt(RInput.val()), parseInt(GInput.val()), parseInt(BInput.val())))

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_rgb.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '（R）</h5>'))
    var Rtopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var Rtopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    Rtopic_input_div.append(Rtopic_input)
    editForm.append(Rtopic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '（G）</h5>'))
    var Gtopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var Gtopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    Gtopic_input_div.append(Gtopic_input)
    editForm.append(Gtopic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '（B）</h5>'))
    var Btopic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var Btopic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    Btopic_input_div.append(Btopic_input)
    editForm.append(Btopic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(Rtopic_input.val()) > 0 && getByteLen(Rtopic_input.val()) < 11 && getByteLen(Gtopic_input.val()) > 0 && getByteLen(Gtopic_input.val()) < 11 && getByteLen(Btopic_input.val()) > 0 && getByteLen(Btopic_input.val()) < 11)
                if (re.test(Rtopic_input.val()) && re.test(Gtopic_input.val()) && re.test(Btopic_input.val())) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', Rtopic_input.val() + "/" + Gtopic_input.val() + "/" + Btopic_input.val())
                        title.text(title_input.val())
                        Rtopic.text(Rtopic_input.val())
                        Gtopic.text(Gtopic_input.val())
                        Btopic.text(Btopic_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            Rtopic_input.val(Rtopic.text())
            Gtopic_input.val(Gtopic.text())
            Btopic_input.val(Btopic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_bar(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var titleDiv = $("<div style='display:flex;flex-direction:row;justify-content:center;align-items:center;margin-top:10px'/>")
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    titleDiv.append(title)
    contents.push(titleDiv)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var chartDiv = $("<div/>")
    chartDiv.css("width", (standardWidth * 3) + "px")
    chartDiv.css("height", (standardWidth * 3 - 50) + "px")
    var chartTarget = echarts.init(chartDiv[0])
    var chartOption = {
        dataZoom: [{
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0]
        }],
        grid: {
            top: 10,
            left: 40,
            right: 30,
            bottom: 75
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
            }
        }]
    };
    chartTarget.setOption(chartOption)
    chartDiv.bind('click', function(event) {
        event.stopPropagation()
    })
    contents.push(chartDiv)
    if (user_content.length > 2) {
        var dataStr = user_content.substring(2)
        var dataArray = dataStr.split(',')
        var dataLength = dataArray.length / 2
        for (var i = 0; i < dataLength; i += 1) {
            var prevX = chartTarget.getOption().xAxis[0]
            var prevY = chartTarget.getOption().series[0]
            prevX.data.push(dataArray[i])
            prevY.data.push(dataArray[i + dataLength])
            chartTarget.setOption({
                xAxis: prevX,
                series: prevY
            })
        }
    }
    var sync_export = function() {
        var dataset = chartTarget.getOption().series[0].data
        var labelset = chartTarget.getOption().xAxis[0].data
        var testData = []
        for (data in dataset) {
            testData.push({
                'time': labelset[data],
                'value': dataset[data]
            })
        }
        var str = JSLang[lang].option + `,` + JSLang[lang].value + `\n`;
        for (var i = 0, len = testData.length; i < len; ++i) {
            for (var item in testData[i]) {
                str += `${testData[i][item]},`;
            }
            str += '\n';
        }
        exportButton.attr("href", "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str))
    }

    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if ((topic1.split("/")[(isMixly ? 3 : 2)] == topic.text())) {
                var data = String(message1)
                itemdiv.trigger(MixIO.eventTags.BAR_CHART_CHANGED, [data])
                var usrContent = titleDiv.parent().parent().attr('user-content').substring(0, 2)
                var prevX = chartTarget.getOption().xAxis[0]
                var prevY = chartTarget.getOption().series[0]
                console.log(prevY.data)
                if (titleDiv.parent().parent().attr('user-content')[1] == "0") {
                    var datalen = prevX.data.length
                    for (var ct = 0; ct <= datalen - 1; ct = ct + 1) {
                        if (data == prevX.data[ct])
                            prevY.data[ct] = parseInt(prevY.data[ct]) + 1
                    }
                } else if (titleDiv.parent().parent().attr('user-content')[1] == "1") {
                    var datalen = prevX.data.length
                    for (var ct = 0; ct <= datalen - 1; ct = ct + 1) {
                        if (data.indexOf(prevX.data[ct]) != -1)
                            prevY.data[ct] = parseInt(prevY.data[ct]) + 1
                    }
                }
                chartTarget.setOption({
                    xAxis: prevX,
                    series: prevY
                })
                var dataset = chartTarget.getOption().series[0].data
                var labelset = chartTarget.getOption().xAxis[0].data
                var mixset = []
                for (data in labelset) {
                    mixset.push(labelset[data])
                }
                for (data in dataset) {
                    mixset.push(dataset[data])
                }
                var mixstr = mixset.join(',')
                titleDiv.parent().parent().attr('user-content', usrContent + mixstr)
                sync_export()
            }
    })


    var delete_on_click = function() {
        title.parent().parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        modeCheckbox.prop("checked", titleDiv.parent().parent().attr('user-content')[1] == 1)
        if (tbd)
            tbd.remove()
    }
    attrs = [
        ['user-type', 'output_bar'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(3, 3, contents, attrs)
    itemdiv.bind(MixIO.actionTags.BAR_CHART_CHANGE, function(event, message) {
        MixIO.publish(topic.text(), message)
    })
    itemdiv.bind(MixIO.actionTags.BAR_CHART_CLEAR, function() {
        clearButton.click()
    })
    itemdiv.addClass("moveDiv")
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_bar.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].choicesList + '</h5>'))
    var option_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var option_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    option_input_div.append(option_input)
    editForm.append(option_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].recvMode + '</h5>'))
    var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
    var modeCheckbox = $("<input type='checkbox'>")
    if (user_content[1] == 1)
        modeCheckbox.prop("checked", true)
    else
        modeCheckbox.prop("checked", false)
    var modeCheckDiv = $("<div class='slider2 round'></div>")
    modeButton.append(modeCheckbox)
    modeButton.append(modeCheckDiv)
    var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center'/>")
    modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'>" + JSLang[lang].single + "</span>"))
    modeDiv.append(modeButton)
    modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'>" + JSLang[lang].multiple + "</span>"))
    editForm.append(modeDiv)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (option_input.val() != "") {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                            titleDiv.parent().parent().attr('user-title', title_input.val())
                            titleDiv.parent().parent().attr('user-topic', topic_input.val())
                            var usrContent = titleDiv.parent().parent().attr('user-content')
                            title.text(title_input.val())
                            topic.text(topic_input.val())
                            modifyDia.close()
                            var prevX = chartTarget.getOption().xAxis[0]
                            var prevY = chartTarget.getOption().series[0]
                            var optionList = option_input.val().split(',')
                            var newXData = []
                            var newYData = []
                            for (option in optionList) {
                                var isFoundInPrev = false
                                for (prevOption in prevX.data) {
                                    if (prevX.data[prevOption] == optionList[option]) {
                                        newXData.push(optionList[option])
                                        newYData.push(prevY.data[prevOption])
                                        isFoundInPrev = true
                                        break
                                    }
                                }
                                if (!isFoundInPrev) {
                                    newXData.push(optionList[option])
                                    newYData.push(0)
                                }
                            }
                            prevX.data = newXData
                            prevY.data = newYData
                            chartTarget.setOption({
                                xAxis: prevX,
                                series: prevY
                            })
                            titleDiv.parent().parent().attr('user-content', usrContent[0] + (modeCheckbox.prop("checked") ? "1" : "0") + newXData.join(',') + ',' + newYData.join(','))
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        } else
            showtext(JSLang[lang].listEmpty)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
    var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
    var clearButton = $('<a class="btn btn-warning btn-circle bbbt"><i class="fa fa-eraser"></i></a>')
    var exportButton = $('<a class="btn btn-info btn-circle bbbt" download="data.csv"><i class="fa fa-download"></i></a>')
    clearButton.click(function() {
        var prevX = chartTarget.getOption().xAxis[0]
        var prevY = chartTarget.getOption().series[0]
        prevY.data = []
        for (tmp in prevX.data) {
            prevY.data.push(0)
        }
        chartTarget.setOption({
            xAxis: prevX,
            series: prevY
        })
        var dataset = chartTarget.getOption().series[0].data
        var labelset = chartTarget.getOption().xAxis[0].data
        var mixset = []
        for (data in labelset) {
            mixset.push(labelset[data])
        }
        for (data in dataset) {
            mixset.push(dataset[data])
        }
        var mixstr = mixset.join(',')
        var usrContent = titleDiv.parent().parent().attr('user-content').substring(0, 2)
        titleDiv.parent().parent().attr('user-content', usrContent + mixstr)
        sync_export()
    })
    editButton.click(edit_on_click)
    deleteButton.click(delete_on_click)
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            if (!isRunning)
                bubble.append(editButton)
            bubble.append(clearButton)
            if (window.screen.height > 800)
                bubble.append(exportButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            option_input.val(chartTarget.getOption().xAxis[0].data.join(','))
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
    sync_export()
    chartDiv.css("width", itemdiv.width() - 8 + "px")
    chartDiv.css("height", itemdiv.height() - 58 + "px")
    chartTarget.resize()
    chartDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    chartDiv.bind('click', function(event) {
        event.stopPropagation()
    })
    chartDiv.bind('wheel', function(event) {
        event.stopPropagation()
    })
    itemdiv.resizable({
        minWidth: 300,
        minHeight: 300,
        onResize: function() {
            chartDiv.css("width", itemdiv.width() - 8 + "px")
            chartDiv.css("height", itemdiv.height() - 58 + "px")
            chartTarget.resize()
        },
        onStopResize: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - parseInt(itemdiv.css('left')) % 20 + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - parseInt(itemdiv.css('top')) % 20 + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft)
            itemdiv.css('top', stdTop)
            var stdWidth = parseInt(itemdiv.css('width')) - parseInt(itemdiv.css('width')) % 20 + (parseInt(itemdiv.css('width')) % 20 > 10 ? 1 : 0) * 20
            var stdHeight = parseInt(itemdiv.css('height')) - parseInt(itemdiv.css('height')) % 20 + (parseInt(itemdiv.css('height')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('width', stdWidth)
            itemdiv.css('height', stdHeight)
            chartDiv.css("width", itemdiv.width() - 8 + "px")
            chartDiv.css("height", itemdiv.height() - 58 + "px")
            chartTarget.resize()
        }
    })
}

function add_dashboard(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var dashDiv = $("<div style='width:70%;height:70%'/>")
    var dashCanvas = $("<canvas/>")
    dashDiv.append(dashCanvas)
    var dashID = randomString() + "dash"
    dashCanvas.attr('id', dashID)
    contents.push(dashDiv)
    attrs = [
        ['user-type', 'output_dashboard'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(2, 2, contents, attrs)
    var gauge = new RadialGauge({ renderTo: dashID, highlights: [] })
    gauge.draw();
    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                if (!isNaN(parseFloat(message1))) {
                    gauge.value = parseFloat(message1)
                    title.parent().parent().attr('user-content', gauge.options.minValue + ',' + gauge.options.maxValue + ',' + gauge.value)
                    itemdiv.trigger(MixIO.eventTags.DASHBOARD_CHANGED, [parseFloat(message1)])
                }
            }
    })
    itemdiv.bind(MixIO.actionTags.DASHBOARD_CHANGE, function(event, value) {
        MixIO.publish(topic.text(), value)
    })

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_dashboard.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].displayRange + '</h5>'))
    var range_input_div = $('<div style="display:flex;flex-direction:row;align-items:center;justify-content:center"/>')
    var min_input = $("<input class='form-control form-control-user' style='text-align:center;min-width:100px!important;width:100px;margin-right:10px'/>")
    var max_input = $("<input class='form-control form-control-user' style='text-align:center;min-width:100px!important;width:100px;margin-left:10px'/>")
    gauge.options.minValue = parseInt(title.parent().parent().attr('user-content').split(',')[0])
    gauge.options.maxValue = parseInt(title.parent().parent().attr('user-content').split(',')[1])
    min_input.val(title.parent().parent().attr('user-content').split(',')[0])
    max_input.val(title.parent().parent().attr('user-content').split(',')[1])
    gauge.value = title.parent().parent().attr('user-content').split(',')[2]
    var max = gauge.options.maxValue
    var min = gauge.options.minValue
    var step = (gauge.options.maxValue - gauge.options.minValue) / 5
    gauge.options.majorTicks = [min, min + step, min + step * 2, min + step * 3, min + step * 4, max]
    gauge.update()
    range_input_div.append(min_input)
    range_input_div.append("-")
    range_input_div.append(max_input)
    editForm.append(range_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        if (parseInt(max_input.val()) - parseInt(min_input.val()) >= 5 && (parseInt(max_input.val()) - parseInt(min_input.val())) % 5 == 0) {
                            title.parent().parent().attr('user-title', title_input.val())
                            title.parent().parent().attr('user-topic', topic_input.val())
                            gauge.options.minValue = parseInt(min_input.val())
                            gauge.options.maxValue = parseInt(max_input.val())
                            var max = gauge.options.maxValue
                            var min = gauge.options.minValue
                            var step = (gauge.options.maxValue - gauge.options.minValue) / 5
                            gauge.options.majorTicks = [min, min + step, min + step * 2, min + step * 3, min + step * 4, max]
                            gauge.update()
                            console.log(gauge)
                            title.parent().parent().attr('user-content', gauge.options.minValue + ',' + gauge.options.maxValue + ',' + gauge.value)
                            title.text(title_input.val())
                            topic.text(topic_input.val())
                            modifyDia.close()
                        } else
                            showtext(JSLang[lang].mod5)
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_map(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var randomName = randomString() + "map"
    var mapDiv = $("<div style='width:calc(100% - 20px);height:calc(100% - 60px)'/>")
    mapDiv.attr("id", randomName)
    mapDiv.bind('click', function(event) {
        event.stopPropagation()
    })
    mapDiv.bind('pointerdown', function(event) {
        event.stopPropagation()
    })
    mapDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    mapDiv[0].addEventListener('touchstart', function(event) {
        event.stopPropagation()
    }, { passive: false })
    contents.push(mapDiv)
    attrs = [
        ['user-type', 'output_map'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(3, 3, contents, attrs)
    var maxLeft = mapDiv[0].clientWidth
    var maxTop = mapDiv[0].clientHeight
    var markers = []
    var setContent = function() {
        var tmp = []
        for (marker in markers) {
            console.log(markers[marker])
            tmp.push(markers[marker].long)
            tmp.push(markers[marker].lat)
            tmp.push(markers[marker].time)
            tmp.push(markers[marker].message)
            tmp.push(markers[marker].clientid)
        }
        title.parent().parent().attr('user-content', tmp.join("@#@$@"))
    }
    itemdiv.bind(MixIO.actionTags.DATA_MAP_CHANGE, function(event, message) {
        MixIO.publish(topic.text(), JSON.stringify(message))
    })
    itemdiv.bind(MixIO.actionTags.DATA_MAP_CLEAR, function() {
        clear_on_click()
    })
    client.on('message', function(topic1, message1) {

        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {

                var label = (new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes() + ":" + (new Date().getSeconds() < 10 ? "0" : "") + new Date().getSeconds())
                if (isJSON(String(message1)) && ("long" in JSON.parse(String(message1))) && ("lat" in JSON.parse(String(message1))) && JSON.parse(String(message1)).clientid) {
                    var jsonMessage = JSON.parse(String(message1))
                    console.log(jsonMessage)
                    itemdiv.trigger(MixIO.eventTags.DATA_MAP_CHANGED, [jsonMessage.clientid, jsonMessage.long, jsonMessage.lat, jsonMessage.message])
                    var newOrNot = true
                    var markerIndex = -1
                    for (marker in markers) {
                        if (jsonMessage.clientid == markers[marker].clientid) {
                            newOrNot = false
                            markerIndex = marker
                            break
                        }
                    }
                    if (newOrNot) {
                        var msgstr = ""
                        if (typeof jsonMessage.message == "string")
                            jsonMessage.message = JSON.parse(jsonMessage.message)
                        for (msg in jsonMessage.message) {
                            msgstr = msgstr + jsonMessage.message[msg].label + ":" + jsonMessage.message[msg].value + "<br>"
                        }
                        var point = new BMapGL.Point(jsonMessage.long, jsonMessage.lat)
                        var newMarker = new BMapGL.Marker(point)
                        markerIndex = markers.length
                        var bubble = create_a_map_bubble(msgstr, label, point)
                        newMarker.bubble = bubble
                        console.log(msgstr)
                        markers.push({
                            "clientid": jsonMessage.clientid,
                            "long": jsonMessage.long,
                            "lat": jsonMessage.lat,
                            "time": label,
                            "message": msgstr,
                            "target": newMarker,
                            "point": point
                        })
                        if (markers.length == 1) {
                            map.centerAndZoom(markers[markerIndex].point, 17);
                        }
                        map.addOverlay(newMarker)
                        newMarker.addEventListener('click', function() {
                            if (map.getOverlays().indexOf(bubble) == -1)
                                map.addOverlay(bubble)
                            else
                                map.removeOverlay(bubble)
                        })
                        map.addOverlay(bubble)
                    } else {
                        markers[markerIndex].time = label
                        var msgstr = ""
                        if (typeof jsonMessage.message == "string")
                            jsonMessage.message = JSON.parse(jsonMessage.message)
                        for (msg in jsonMessage.message) {
                            msgstr = msgstr + jsonMessage.message[msg].label + ":" + jsonMessage.message[msg].value + "<br>"
                        }
                        var point = new BMapGL.Point(jsonMessage.long, jsonMessage.lat)
                        markers[markerIndex].long = jsonMessage.long
                        markers[markerIndex].lat = jsonMessage.lat
                        markers[markerIndex].point = point
                        markers[markerIndex].message = msgstr
                        markers[markerIndex].target.bubble.setPosition(point)
                        markers[markerIndex].target.setPosition(point)
                        markers[markerIndex].target.bubble.setContent(label + "<br>" + msgstr)
                        if (map.getOverlays().indexOf(bubble) == -1)
                            map.addOverlay(bubble)
                    }
                    setContent()
                } else {
                    showtext(JSLang[lang].mapJSON)
                }
            }
    })
    var map = new BMapGL.Map(randomName)
    map.centerAndZoom(new BMapGL.Point(116.373, 39.967), 17)
    map.enableScrollWheelZoom(true);
    map.disableContinuousZoom();
    map.disableInertialDragging();
    var opts = {
        offset: new BMapGL.Size(0, 0)
    };
    var label = new BMapGL.Label();
    label.setStyle({
        color: '#4e73df',
        borderRadius: '5px',
        borderColor: '#ccc',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '8px',
        fontSize: '1rem',
        fontFamily: 'Nunito'
    });
    map.addEventListener('mousemove', function(e) {
        if (!isRunning) {
            map.addOverlay(label)
            label.setContent(e.latlng.lng.toFixed(4) + ',' + e.latlng.lat.toFixed(4))
            label.setPosition(new BMapGL.Point(e.latlng.lng, e.latlng.lat))
        } else
            map.removeOverlay(label)
    });
    var toBeAdded = user_content.split("@#@$@")
    var addLength = toBeAdded.length / 5
    console.log(toBeAdded)
    for (var tmpi = 0; tmpi <= addLength - 1; tmpi = tmpi + 1) {
        var point = new BMapGL.Point(toBeAdded[tmpi * 5], toBeAdded[tmpi * 5 + 1])
        var newMarker = new BMapGL.Marker(point)
        var bubble = create_a_map_bubble(toBeAdded[tmpi * 5 + 3], toBeAdded[tmpi * 5 + 2], point)
        newMarker.bubble = bubble
        markers.push({
            "long": toBeAdded[tmpi * 5],
            "lat": toBeAdded[tmpi * 5 + 1],
            "time": toBeAdded[tmpi * 5 + 2],
            "message": toBeAdded[tmpi * 5 + 3],
            "clientid": toBeAdded[tmpi * 5 + 4],
            "target": newMarker,
            "point": point
        })
        if (markers.length == 1) {
            map.centerAndZoom(point, 17);
        }
        map.addOverlay(newMarker)
        newMarker.addEventListener('click', function(bubble) {
            return function() {
                if (map.getOverlays().indexOf(bubble) == -1)
                    map.addOverlay(bubble)
                else
                    map.removeOverlay(bubble)
            }
        }(bubble))
        map.addOverlay(bubble)
    }
    setContent()

    var delete_on_click = function() {
        $("#trashbin").append(mapDiv)
        title.parent().parent().remove();
        isAlive = false;
        if (tbd)
            tbd.remove()
    }
    var clear_on_click = function() {
        map.clearOverlays()
        markers = []
        setContent()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_map.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        if (title.parent().parent().attr('user-content') == undefined)
                            title.parent().parent().attr('user-content', "")
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var clearButton = $('<a class="btn btn-warning btn-circle bbbt"><i class="fa fa-eraser"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            clearButton.click(clear_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            bubble.append(clearButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
    itemdiv.resizable({
        minWidth: 300,
        minHeight: 300,
        onStopResize: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - parseInt(itemdiv.css('left')) % 20 + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - parseInt(itemdiv.css('top')) % 20 + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft)
            itemdiv.css('top', stdTop)
            var stdWidth = parseInt(itemdiv.css('width')) - parseInt(itemdiv.css('width')) % 20 + (parseInt(itemdiv.css('width')) % 20 > 10 ? 1 : 0) * 20
            var stdHeight = parseInt(itemdiv.css('height')) - parseInt(itemdiv.css('height')) % 20 + (parseInt(itemdiv.css('height')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('width', stdWidth)
            itemdiv.css('height', stdHeight)
        }
    })
}

function create_a_map_bubble(messageBody, time, point) {
    var opts = {
        position: point,
        offset: new BMapGL.Size(0, 0)
    };
    var label = new BMapGL.Label(time + "<br>" + messageBody, opts);
    label.setStyle({
        color: '#4e73df',
        borderRadius: '5px',
        borderColor: '#ccc',
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: '8px',
        fontSize: '1rem',
        fontFamily: 'Nunito'
    });
    return label
}

function add_text(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var textDiv = $("<div/>")
    textDiv.html(stringendecoder.decodeHtml(user_content))
    var minFontSize = 1
    var fontSize = 3 - user_content.length / 3
    if (fontSize < minFontSize)
        fontSize = minFontSize
    textDiv.css('font-size', fontSize + 'rem')
    textDiv.attr('class', 'mid_screen')
    contents.push(textDiv)
    attrs = [
        ['user-type', 'output_text'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(2, 2, contents, attrs)
    itemdiv.bind(MixIO.actionTags.TEXT_SCREEN_CHANGE, function(event, message) {
        MixIO.publish(topic.text(), message)
    })
    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                textDiv.animate({ opacity: 0 }, 200);
                setTimeout(function() {
                    textDiv.empty()
                    // set innerHTML
                    textDiv.html(stringendecoder.decodeHtml(String(message1)))
                    var minFontSize = 1
                    var fontSize = 3 - String(message1).length / 3
                    if (fontSize < minFontSize)
                        fontSize = minFontSize
                    textDiv.css('font-size', fontSize + 'rem')
                    textDiv.animate({ opacity: 1 }, 200);
                    title.parent().parent().attr('user-content', stringendecoder.encodeHtml(String(message1)))
                    itemdiv.trigger(MixIO.eventTags.TEXT_SCREEN_CHANGED, [String(message1)])
                }, 200)
            }
    })

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_text.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        if (title.parent().parent().attr('user-content') == undefined)
                            title.parent().parent().attr('user-content', "")
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_table(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    client.on('message', function(topic1, message1) {
        if (isRunning)
            if (isAlive && isRunning)
                if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                    var cols = []
                    // if not JSON
                    if(!isJSON(String(message1)))
                    {
                        for (datafield in datafields) {
                            if (datafields[datafield].type != "control" && datafields[datafield].name != "时间" && datafields[datafield].name != "時間" && datafields[datafield].name != "time")
                                cols.push(datafields[datafield].name)
                        }
                        var message = String(message1).split(',')
                        itemdiv.trigger(MixIO.eventTags.DATA_TABLE_CHANGED, [message])
                        var toBePushed = {}
                        var index = 0
                        toBePushed["時間"] = timeStamp2String()
                        toBePushed["时间"] = timeStamp2String()
                        toBePushed["time"] = timeStamp2String()
                        for (datafield in cols) {
                            toBePushed[cols[datafield]] = message[index] ? message[index] : ''
                            index = index + 1
                        }
                        dataset.unshift(toBePushed)
                        console.log(dataset)
                        init_table()
                        setContent()
                    }
                    else
                    {
                        // use JSON's keys as columns
                        var message = JSON.parse(String(message1))
                        itemdiv.trigger(MixIO.eventTags.DATA_TABLE_CHANGED, [message])
                        // make datafield
                        datafields = []
                        // push time
                        datafields.push({
                            "name": JSLang[lang].time,
                            "type": "text",
                            "align": "center"
                        })
                        for (datafield in message) {
                            datafields.push({
                                "name": datafield,
                                "type": "text",
                                "align": "center"
                            })
                        }
                        var cols = []
                        for (datafield in datafields) {
                            cols.push(datafields[datafield].name)
                        }
                        count_input.val(cols.join(','))
                        // make dataset
                        var toBePushed = {}
                        toBePushed["時間"] = timeStamp2String()
                        toBePushed["时间"] = timeStamp2String()
                        toBePushed["time"] = timeStamp2String()
                        for (datafield in message) {
                            toBePushed[datafield] = message[datafield]
                        }
                        dataset.unshift(toBePushed)
                        console.log(dataset)
                        init_table()
                        setContent()
                    }
                }
    })
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var tableDiv = $("<div/>")
    tableDiv.click(function(event) {
        event.stopPropagation()
    })
    tableDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    tableDiv.bind('pointerdown', function(event) {
        event.stopPropagation()
    })

    contents.push(tableDiv)
    var textDiv = $("<div/>")
    textDiv.text(stringendecoder.decodeHtml(user_content))
    textDiv.attr('class', 'mid_screen')
        //contents.push(textDiv)
    attrs = [
        ['user-type', 'table'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(3, 3, contents, attrs)
    itemdiv.bind(MixIO.actionTags.DATA_TABLE_CHANGE, function(event, message) {
        MixIO.publish(topic.text(), message)
    })
    itemdiv.bind(MixIO.actionTags.DATA_TABLE_CLEAR, function() {
        clear_on_click()
    })
    itemdiv.addClass("moveDiv")

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var clear_on_click = function() {
        dataset = []
        init_table()
        setContent()
        sync_export()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/table.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].columns + '</h5>'))
    var count_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var count_input = $("<input class='form-control form-control-user' style='text-align:center'/>")
    count_input_div.append(count_input)
    editForm.append(count_input_div)

    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        if (count_input.val() != "") {
                            title.parent().parent().attr('user-title', title_input.val())
                            title.parent().parent().attr('user-topic', topic_input.val())
                            title.text(title_input.val())
                            topic.text(topic_input.val())
                            var colNames = count_input.val().split(',')
                            datafields = []
                            for (colName in colNames) {
                                datafields.push({
                                    name: colNames[colName],
                                    align: 'center',
                                    type: 'text'
                                })
                            }
                            init_table()
                            setContent()
                            modifyDia.close()
                        } else
                            showtext(JSLang[lang].columnsSet)
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var exportButton = $('<a class="btn btn-info btn-circle bbbt" download="data.csv"><i class="fa fa-download"></i></a>')
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var clearButton = $('<a class="btn btn-warning btn-circle bbbt"><i class="fa fa-eraser"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            clearButton.click(clear_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (window.screen.width > 800)
                bubble.append(exportButton)
            bubble.append(clearButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    var sync_export = function() {
        var cols = []
        for (datafield in datafields) {
            if (datafields[datafield].type != "control")
                cols.push(datafields[datafield].name)
        }
        var colNameStr = ''
        for (datafield in cols) {
            colNameStr = colNameStr + cols[datafield] + ","
        }
        colNameStr = colNameStr + '\n'
        var colValStr = ''
        for (data in dataset) {
            var dataArray = dataset[data]
            for (datafield in cols) {
                if (dataArray[cols[datafield]])
                    colValStr = colValStr + dataArray[cols[datafield]] + ","
                else
                    colValStr = colValStr + ','
            }
            colValStr += '\n';
        }
        exportButton.attr("href", "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(colNameStr + colValStr))
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
    var dataset = [];
    var colCount = parseInt(user_content.split(',')[0])
    var colNames = user_content.split(',').slice(1, 1 + colCount)
    console.log(colNames)
    count_input.val(colNames.join(','))
    var colVals = user_content.split(',').slice(1 + colCount)
    var rowNum = colVals.length / colCount
    for (var rowct = 1; rowct <= rowNum; rowct = rowct + 1) {
        var toBePushed = {}
        for (var colct = 1; colct <= colCount; colct = colct + 1) {
            toBePushed[colNames[colct - 1]] = colVals[(rowct - 1) * colCount + colct - 1]
        }
        dataset.push(toBePushed)
    }
    var datafields = []
    for (colName in colNames) {
        datafields.push({
            name: colNames[colName],
            align: 'center',
            type: 'text'
        })
    }
    var setContent = function() {
        var cols = []
        for (datafield in datafields) {
            if (datafields[datafield].type != "control")
                cols.push(datafields[datafield].name)
        }
        var colNameStr = ''
        for (datafield in cols) {
            colNameStr = colNameStr + "," + cols[datafield]
        }
        var colValStr = ''
        for (data in dataset) {
            var dataArray = dataset[data]
            for (datafield in cols) {
                if (dataArray[cols[datafield]])
                    colValStr = colValStr + ',' + dataArray[cols[datafield]]
                else
                    colValStr = colValStr + ','
            }
        }
        title.parent().parent().attr('user-content', cols.length + colNameStr + colValStr)
    }
    var init_table = function() {
        if (dataset.length != 0 && datafields[datafields.length - 1].type != 'control')
            datafields.push({ type: 'control' })
        if (dataset.length == 0 && datafields[datafields.length - 1].type == 'control')
            datafields.pop()
        tableDiv.jsGrid({
            width: "calc(100% - 40px)",
            height: "calc(100% - 80px)",
            noDataContent: JSLang[lang].noData,
            editing: true,
            data: dataset,
            confirmDeleting: false,
            fields: datafields,
            onItemDeleted: function() {
                setContent()
                sync_export()
            },
            onItemUpdated: function() {
                setContent()
                sync_export()
            }
        });
        sync_export()
    }
    init_table()
    itemdiv.resizable({
        minWidth: 300,
        minHeight: 300,

        onResize: function() {
            tableDiv.jsGrid("refresh")
        },
        onStopResize: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - parseInt(itemdiv.css('left')) % 20 + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - parseInt(itemdiv.css('top')) % 20 + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft)
            itemdiv.css('top', stdTop)
            var stdWidth = parseInt(itemdiv.css('width')) - parseInt(itemdiv.css('width')) % 20 + (parseInt(itemdiv.css('width')) % 20 > 10 ? 1 : 0) * 20
            var stdHeight = parseInt(itemdiv.css('height')) - parseInt(itemdiv.css('height')) % 20 + (parseInt(itemdiv.css('height')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('width', stdWidth)
            itemdiv.css('height', stdHeight)
            tableDiv.jsGrid("refresh")
        }
    })
}

last_weather_synced = new Date()

function add_weather(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true

    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var weatherDiv = $("<div style='background-color:#1cc88a;color:white;padding:6px;text-align:center;border-radius:5px;width:90%'/>")
    contents.push(weatherDiv)
    var dscname = $("<p style='margin:0'>&nbsp;</p>")
    weatherDiv.append(dscname)
    var tmmper = $("<p style='margin:0'>&nbsp;</p>")
    weatherDiv.append(tmmper)
    var tmmper2 = $("<p style='margin:0'>&nbsp;</p>")
    weatherDiv.append(tmmper2)
    var buttonDiv = $("<div style='margin-top:10px'/>")
    var syncIcon = $('<button class="btn btn-warning btn-circle" style="margin-right:10px"><i class="fa fa-refresh"></i></button>')
    var sendIcon = $('<button class="btn btn-primary btn-circle" style="margin-left:10px" disabled><i class="fa fa-paper-plane"></i></button>')
    var district = ''
    var weather_type = ''
    var temperature = ''
    var humidity = ''
    var wind_dir = ''
    var wind_class = ''
    sendIcon.click(function(event) {
        event.stopPropagation()
        var weather = {
            'district': district,
            'weather_type': weather_type,
            'temperature': temperature,
            'humidity': humidity,
            'wind_dir': wind_dir,
            'wind_class': wind_class
        }
        publish(topic.text(), JSON.stringify(weather))
        itemdiv.trigger(MixIO.eventTags.WEATHER_SENT, [district, weather_type, temperature, humidity, wind_dir, wind_class])
    })
    sendIcon.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    sendIcon.bind('mouseup', function(event) {
        event.stopPropagation()
    })
    buttonDiv.append(syncIcon)
    syncIcon.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    syncIcon.bind('mouseup', function(event) {
        event.stopPropagation()
    })

    var sync_weather = function(event) {
        if (event != undefined)
            event.stopPropagation()
        syncIcon.children().attr('class', 'fa fa-refresh fa-spin')
        weatherDiv.css('background-color', '#e74a3b')
        tmmper.html(JSLang[lang].updating)
        $.get('getWeather', {
            'dsc_code': title.parent().parent().attr('user-content').split(',')[0].split('w')[0]
        }, function(res) {
            syncIcon.children().attr('class', 'fa fa-refresh')
            var resJSON = JSON.parse(res)
            if (resJSON.status == 0) {
                sendIcon.removeAttr('disabled')
                weatherDiv.css('background-color', '#1cc88a')
                dscname.html(resJSON.result.location.name)
                district = resJSON.result.location.name
                tmmper.html(resJSON.result.now.temp + "℃&nbsp;&nbsp;" + resJSON.result.now.text + "&nbsp;&nbsp;" + resJSON.result.now.rh + "%RH")
                weather_type = resJSON.result.now.text
                temperature = resJSON.result.now.temp
                humidity = resJSON.result.now.rh
                tmmper2.html(resJSON.result.now.wind_dir + "&nbsp;&nbsp;" + resJSON.result.now.wind_class)
                wind_dir = resJSON.result.now.wind_dir
                wind_class = resJSON.result.now.wind_class
                title.parent().parent().attr('user-content', [title.parent().parent().attr('user-content').split(',')[0], district, weather_type, temperature, humidity, wind_dir, wind_class].join(','))
            } else {
                sendIcon.attr('disabled', 'disabled')
                dscname.html("&nbsp;")
                tmmper.html(JSLang[lang].updateF)
                tmmper2.html("&nbsp;")
            }
            itemdiv.trigger(MixIO.eventTags.WEATHER_SYNCED, [district, weather_type, temperature, humidity, wind_dir, wind_class])
        })

    }
    syncIcon.bind('click', sync_weather)

    buttonDiv.append(sendIcon)
    contents.push(buttonDiv)
    attrs = [
        ['user-type', 'input_weather'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(2, 2, contents, attrs)
    itemdiv.bind(MixIO.actionTags.WEATHER_SYNC, function() {
        sync_weather()

    })
    itemdiv.bind(MixIO.actionTags.WEATHER_SEND, function() {
        var weather = {
            'district': district,
            'weather_type': weather_type,
            'temperature': temperature,
            'humidity': humidity,
            'wind_dir': wind_dir,
            'wind_class': wind_class
        }
        publish(topic.text(), JSON.stringify(weather))
    })
    sync_weather()
    if (title.parent().parent().attr('user-content').split(',')[0].split('w').length == 3) {
        var syncInterval = parseInt(title.parent().parent().attr('user-content').split(',')[0].split('w')[1])
        if (syncInterval != 0) {
            MixIO.setInterval(function() {
                if (isRunning && isAlive)
                    syncIcon.click()
            }, syncInterval * 60000)
        }
        var sendInterval = parseInt(title.parent().parent().attr('user-content').split(',')[0].split('w')[2])
        if (sendInterval != 0) {
            MixIO.setInterval(function() {

                if (isRunning && isAlive) {
                    sendIcon.click()
                }
            }, sendInterval * 60000)
        }
    }

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        if (title.parent().parent().attr('user-content').substring(2, 6) == "0000")
            province_input.val(title.parent().parent().attr('user-content').split(',')[0].split('w')[0]).trigger('change')
        else if (title.parent().parent().attr('user-content').substring(4, 6) == "00") {
            province_input.val(title.parent().parent().attr('user-content').substring(0, 2) + "0000").trigger('change')
            city_input.val(title.parent().parent().attr('user-content').split(',')[0].split('w')[0]).trigger('change')
        } else {
            province_input.val(title.parent().parent().attr('user-content').substring(0, 2) + "0000").trigger('change')
            city_input.val(title.parent().parent().attr('user-content').substring(0, 4) + "00").trigger('change')
            district_input.val(title.parent().parent().attr('user-content').split(',')[0].split('w')[0]).trigger('change')
        }
        if (title.parent().parent().attr('user-content').split(',')[0].split('w').length < 3) {
            sync_input.val(0)
            send_input.val(0)
        } else {
            sync_input.val(title.parent().parent().attr('user-content').split(',')[0].split('w')[1])
            send_input.val(title.parent().parent().attr('user-content').split(',')[0].split('w')[2])
        }
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/input_weather.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)

    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].syncInterval + '</h5>'))
    var sync_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var sync_input = $("<select class='form-control form-control-user' style='text-align:center;text-align-last:center;appearance:none;'></select>")
    sync_input.append($("<option value='0'>" + JSLang[lang].never + "</option>"))
    sync_input.append($("<option value='15'>" + JSLang[lang].i15min + "</option>"))
    sync_input.append($("<option value='30'>" + JSLang[lang].i30min + "</option>"))
    sync_input.append($("<option value='60'>" + JSLang[lang].i60min + "</option>"))
    sync_input_div.append(sync_input)
    editForm.append(sync_input_div)

    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].sendInterval + '</h5>'))
    var send_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var send_input = $("<select class='form-control form-control-user' style='text-align:center;text-align-last:center;appearance:none;'></select>")
    send_input.append($("<option value='0'>" + JSLang[lang].never + "</option>"))
    send_input.append($("<option value='1'>" + JSLang[lang].i1min + "</option>"))
    send_input.append($("<option value='3'>" + JSLang[lang].i3min + "</option>"))
    send_input.append($("<option value='5'>" + JSLang[lang].i5min + "</option>"))
    send_input.append($("<option value='10'>" + JSLang[lang].i10min + "</option>"))
    send_input_div.append(send_input)
    editForm.append(send_input_div)

    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].location + '</h5>'))
    var province_input = $("<select class='form-control form-control-user' style='text-align:center;text-align-last:center;appearance:none;'></select>")
    province_input.append($("<option value='unselected'>" + JSLang[lang].province + "</option>"))
    for (district in districts) {
        province_input.append($("<option value='" + district + "'>" + districts[district].name + "</option>"))
    }
    editForm.append(province_input)
    var city_input = $("<select class='form-control form-control-user' style='margin-top:5px;text-align:center;text-align-last:center;appearance:none;' disabled></select>")
    city_input.append($("<option value='unselected'>" + JSLang[lang].city + "</option>"))
    editForm.append(city_input)
    province_input.change(function() {
        city_input.empty()
        city_input.append($("<option value='unselected'>" + JSLang[lang].city + "</option>"))
        district_input.empty()
        district_input.append($("<option value='unselected'>" + JSLang[lang].district + "</option>"))
        district_input.attr('disabled', 'disabled')
        if (province_input.val() != "unselected") {
            for (district in districts[province_input.val()].child) {
                city_input.append($("<option value='" + district + "'>" + (districts[province_input.val()].child)[district].name + "</option>"))
            }
            city_input.removeAttr('disabled')
        } else
            city_input.attr('disabled', 'disabled')
    })
    var district_input = $("<select class='form-control form-control-user' style='margin-top:5px;text-align:center;text-align-last:center;appearance:none;' disabled></select>")
    district_input.append($("<option value='unselected'>" + JSLang[lang].district + "</option>"))
    editForm.append(district_input)
    city_input.change(function() {
        district_input.empty()
        district_input.append($("<option value='unselected'>" + JSLang[lang].district + "</option>"))
        if (city_input.val() != "unselected") {
            console.log(province_input.val())
            for (district in (districts[province_input.val()].child)[city_input.val()].child) {
                district_input.append($("<option value='" + district + "'>" + ((districts[province_input.val()].child)[city_input.val()].child)[district] + "</option>"))
            }
            district_input.removeAttr('disabled')
        } else
            district_input.attr('disabled', 'disabled')
    })
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        var placecode = province_input.val() == "unselected" ? "unselected" : (city_input.val() == "unselected" ? province_input.val() : (district_input.val() == "unselected" ? city_input.val() : district_input.val()))
        if (placecode == "unselected")
            showtext(JSLang[lang].locationSet)
        else {
            if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
                var re = /^[a-z0-9]+$/i;
                if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                    if (true) {
                        if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                            title.parent().parent().attr('user-title', title_input.val())
                            title.parent().parent().attr('user-topic', topic_input.val())
                            title.parent().parent().attr('user-content', placecode + "w" + sync_input.val() + "w" + send_input.val())
                            if (title.parent().parent().attr('user-content') == undefined)
                                title.parent().parent().attr('user-content', "")
                            title.text(title_input.val())
                            topic.text(topic_input.val())
                            modifyDia.close()
                            sync_weather()
                        } else
                            showtext(JSLang[lang].sameUnit)
                    } else
                        showtext("")
                else
                    showtext(JSLang[lang].topicLenIllegal)
            } else
                showtext(JSLang[lang].nameLenIllegal)
        }
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function add_chart(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var isTable = false
    var contents = []
    var titleDiv = $("<div style='display:flex;flex-direction:row;justify-content:center;align-items:center;margin-top:10px'/>")
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    titleDiv.append(title)
    contents.push(titleDiv)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='color:#858796;margin:0;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var tableDiv = $("<div/>")
    tableDiv.click(function(event) {
        event.stopPropagation()
    })
    tableDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    tableDiv.bind('pointerdown', function(event) {
        event.stopPropagation()
    })
    var convert_on_click = function() {
        if (isTable) {
            tableDiv.attr("hidden", "hidden")
            chartDiv.removeAttr("hidden")
        } else {
            tableDiv.removeAttr("hidden")
            chartDiv.attr("hidden", "hidden")
            sync_table()
        }
        isTable = !isTable
    }
    var sync_table = function() {
        var datafields = []
        var dataset = []
        var timeLine = chartTarget.getOption().xAxis[0].data
        var series = chartTarget.getOption().series
        var valGroup = {}
        for (sery in series) {
            valGroup[series[sery].name] = series[sery].data
        }
        datafields.push({
            name: JSLang[lang].time,
            align: 'center',
            type: 'text'
        })
        for (valLine in valGroup) {
            datafields.push({
                name: valLine,
                align: 'center',
                type: 'text'
            })
        }
        for (time in timeLine) {
            var tmp = {}
            tmp[JSLang[lang].time] = timeLine[time]
            for (valLine in valGroup) {
                tmp[valLine] = valGroup[valLine][time]
            }
            dataset.unshift(tmp)
        }
        tableDiv.jsGrid({
            width: "calc(100% - 40px)",
            height: "calc(100% - 80px)",
            noDataContent: JSLang[lang].noData,
            data: dataset,
            fields: datafields
        });
    }
    contents.push(tableDiv)
    var chartDiv = $("<div/>")
    chartDiv.css("width", (standardWidth * 3) + "px")
    chartDiv.css("height", (standardWidth * 3 - 50) + "px")
    var chartTarget = echarts.init(chartDiv[0])
    var chartOption = {
        dataZoom: [{
            id: 'dataZoomX',
            type: 'slider',
            xAxisIndex: [0]
        }],
        grid: {
            top: 10,
            left: 50,
            right: 30,
            bottom: 75
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        tooltip: {
            trigger: 'axis'
        },
        series: []
    };
    chartTarget.setOption(chartOption)
    chartDiv.bind('click', function(event) {
        event.stopPropagation()
    })
    contents.push(chartDiv)
    if (user_content.length > 2) {
        var dataStr = user_content.substring(2)
        var dataPack = stringendecoder.decodeHtml(dataStr)
        if (isJSON(dataPack)) {
            var json_parsed = JSON.parse(dataPack)
            chartTarget.setOption({
                xAxis: json_parsed.prevX,
                series: json_parsed.series
            })
        }
    }
    var sync_export = function() {
        var timeLine = chartTarget.getOption().xAxis[0].data
        var series = chartTarget.getOption().series
        var cols = [JSLang[lang].time]
        for (sery in series) {
            cols.push(series[sery].name)
        }
        var colNameStr = cols.join(',') + '\n'
        var colValStr = ''
        for (time in timeLine) {
            var colVals = [timeLine[time]]
            for (sery in series) {
                colVals.push(series[sery].data[time])
            }
            colValStr = colValStr + colVals.join(',') + '\n'
        }
        exportButton.attr("href", "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(colNameStr + colValStr))
    }

    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if ((topic1.split("/")[(isMixly ? 3 : 2)] == topic.text())) {
                var label = (new Date().getHours() + ":" + (new Date().getMinutes() < 10 ? "0" : "") + new Date().getMinutes() + ":" + (new Date().getSeconds() < 10 ? "0" : "") + new Date().getSeconds())
                var data = String(message1)
                var usrContent = titleDiv.parent().parent().attr('user-content').substring(0, 2)
                var prevX = chartTarget.getOption().xAxis[0]
                var series = chartTarget.getOption().series
                itemdiv.trigger(MixIO.eventTags.LINE_CHART_CHANGED, [label, data])
                if (isJSON(data)) {
                    var json_parsed = JSON.parse(data)
                    for (key in json_parsed) {
                        var alreadyHave = false
                        for (sery in series) {
                            if (series[sery].name == key) {
                                alreadyHave = true
                            }
                        }
                        if (!alreadyHave) {
                            nanData = []
                            for (index in chartTarget.getOption().xAxis[0].data)
                                nanData.push(NaN)
                            series.push({
                                data: nanData,
                                type: 'line',
                                connectNulls: true,
                                name: key
                            })
                        }
                    }
                } else {

                    var alreadyHave = false
                    for (sery in series) {
                        if (series[sery].name == JSLang[lang].value) {
                            alreadyHave = true
                        }
                    }
                    if (!alreadyHave) {
                        nanData = []
                        for (index in chartTarget.getOption().xAxis[0].data)
                            nanData.push(NaN)
                        series.unshift({
                            data: nanData,
                            type: 'line',
                            connnectNulls: true,
                            name: JSLang[lang].value
                        })
                    }
                }
                prevX.data.push(label)
                if (isJSON(data)) {
                    var json_parsed = JSON.parse(data)
                    for (sery in series) {
                        var inserted = false
                        for (key in json_parsed) {
                            if (series[sery].name == key) {
                                series[sery].data.push(json_parsed[key])
                                inserted = true
                                break
                            }
                        }
                        if (!inserted)
                            series[sery].data.push(NaN)
                    }
                } else {
                    for (sery in series) {
                        var inserted = false
                        if (series[sery].name == JSLang[lang].value) {
                            series[sery].data.push(data)
                            inserted = true
                            break
                        }
                        if (!inserted)
                            series[sery].data.push(NaN)
                    }
                }
                var simplifiedSeries = []
                for (sery in series) {
                    simplifiedSeries.push({
                        data: series[sery].data,
                        type: 'line',
                        connectNulls: true,
                        name: series[sery].name
                    })
                }
                chartTarget.setOption({
                    xAxis: { 'data': prevX.data },
                    series: simplifiedSeries
                })
                var contentSave = {
                    prevX: { 'data': prevX.data },
                    series: simplifiedSeries
                }
                titleDiv.parent().parent().attr('user-content', usrContent + stringendecoder.encodeHtml(JSON.stringify(contentSave)))
                sync_export()
                sync_table()
            }
    })


    var delete_on_click = function() {
        title.parent().parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        modeCheckbox.prop("checked", titleDiv.parent().parent().attr('user-content')[1] == 1)
        if (tbd)
            tbd.remove()
    }
    attrs = [
        ['user-type', 'output_chart'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(3, 3, contents, attrs)
    itemdiv.addClass("moveDiv")
    itemdiv.bind(MixIO.actionTags.LINE_CHART_CHANGE, function(event, value) {
        console.log(value)
        MixIO.publish(topic.text(), value)
    })
    itemdiv.bind(MixIO.actionTags.LINE_CHART_CLEAR, function() {
        clearButton.click()
    })
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_chart.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center;margin-bottom:5px"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center;width:250px;min-width:250px'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
    var modeCheckbox = $("<input type='checkbox'>")
    if (user_content[1] == 1)
        modeCheckbox.prop("checked", true)
    else
        modeCheckbox.prop("checked", false)
    var modeCheckDiv = $("<div class='slider2 round'></div>")
    modeButton.append(modeCheckbox)
    modeButton.append(modeCheckDiv)
    var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center' hidden/>")
    modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'></span>"))
    modeDiv.append(modeButton)
    modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'></span>"))
    editForm.append(modeDiv)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df;"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        titleDiv.parent().parent().attr('user-title', title_input.val())
                        titleDiv.parent().parent().attr('user-topic', topic_input.val())
                        var usrContent = titleDiv.parent().parent().attr('user-content')
                        titleDiv.parent().parent().attr('user-content', usrContent[0] + (modeCheckbox.prop("checked") ? "1" : "0") + usrContent.substring(2))
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        modifyDia.close()
                        sync_export()
                        sync_table()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)

    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
    var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
    var clearButton = $('<a class="btn btn-warning btn-circle bbbt"><i class="fa fa-eraser"></i></a>')
    var convertButton = $('<a class="btn btn-secondary btn-circle bbbt""><i class="fa fa-exchange"></i></a>')
    var exportButton = $('<a class="btn btn-info btn-circle bbbt" download="data.csv"><i class="fa fa-download"></i></a>')
    clearButton.click(function() {
        chartTarget.setOption(chartOption, true)
        titleDiv.parent().parent().attr('user-content', titleDiv.parent().parent().attr('user-content').substring(0, 2))
        sync_export()
        sync_table()
    })
    editButton.click(edit_on_click)
    convertButton.click(convert_on_click)
    deleteButton.click(delete_on_click)
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            if (!isRunning)
                bubble.append(editButton)
            bubble.append(clearButton)
            bubble.append(convertButton)
            if (window.screen.width > 800)
                bubble.append(exportButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
    sync_export()
    chartDiv.css("width", itemdiv.width() - 8 + "px")
    chartDiv.css("height", itemdiv.height() - 58 + "px")
    chartTarget.resize()
    chartDiv.bind('mousedown', function(event) {
        event.stopPropagation()
    })
    chartDiv.bind('click', function(event) {
        event.stopPropagation()
    })
    chartDiv.bind('wheel', function(event) {
        event.stopPropagation()
    })
    sync_table()
    tableDiv.attr("hidden", "hidden")
    itemdiv.css('overflow', 'hidden')
    itemdiv.resizable({
        minWidth: 300,
        minHeight: 300,
        onResize: function() {
            chartDiv.css("width", itemdiv.width() - 8 + "px")
            chartDiv.css("height", itemdiv.height() - 58 + "px")
            chartTarget.resize()
        },
        onStopResize: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - parseInt(itemdiv.css('left')) % 20 + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - parseInt(itemdiv.css('top')) % 20 + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft)
            itemdiv.css('top', stdTop)
            var stdWidth = parseInt(itemdiv.css('width')) - parseInt(itemdiv.css('width')) % 20 + (parseInt(itemdiv.css('width')) % 20 > 10 ? 1 : 0) * 20
            var stdHeight = parseInt(itemdiv.css('height')) - parseInt(itemdiv.css('height')) % 20 + (parseInt(itemdiv.css('height')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('width', stdWidth)
            itemdiv.css('height', stdHeight)
            chartDiv.css("width", itemdiv.width() - 8 + "px")
            chartDiv.css("height", itemdiv.height() - 58 + "px")
            chartTarget.resize()
        }
    })
}

function add_decorate_text(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var ctt = $("<h4 class='userTitle' style='margin:0'>" + user_content.replaceAll('\n', '<br>') + "</h4>")
    contents.push(ctt)
    attrs = [
        ['user-type', 'decorate_text'],
        ['user-title', randomString()],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(2, 1, contents, attrs)

    var delete_on_click = function() {
        ctt.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/decorate_text.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].displayText + '</h5>'))
    var text_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var text_input = $("<textarea class='form-control form-control-user'  style='text-align:center;width:250px'/>")
    text_input_div.append(text_input)
    editForm.append(text_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        modifyDia.close()
        ctt.html(text_input.val().replaceAll('\n', '<br>'))
        ctt.parent().parent().attr("user-content", text_input.val())
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5) && !isRunning) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
            {
                // copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                //styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            text_input.val(ctt.html().replaceAll('<br>', '\n'))
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
    itemdiv.css('overflow', 'hidden')
    itemdiv.resizable({
        minWidth: 20,
        minHeight: 20,
        onStopResize: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - parseInt(itemdiv.css('left')) % 20 + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - parseInt(itemdiv.css('top')) % 20 + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft)
            itemdiv.css('top', stdTop)
            var stdWidth = parseInt(itemdiv.css('width')) - parseInt(itemdiv.css('width')) % 20 + (parseInt(itemdiv.css('width')) % 20 > 10 ? 1 : 0) * 20
            var stdHeight = parseInt(itemdiv.css('height')) - parseInt(itemdiv.css('height')) % 20 + (parseInt(itemdiv.css('height')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('width', stdWidth)
            itemdiv.css('height', stdHeight)
        }
    })
}

function add_decorate_pic(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    // check user_content type: image or video
    var ctt = null
    if(user_content.endsWith(".mp4") || user_content.endsWith(".webm") || user_content.endsWith(".ogg")){
        var ctt = $("<video style='height:100%;width:100%' src='" + user_content + "' controls loop></video>")
    }else
    {
        var ctt = $("<img style='height:100%;width:100%' src='" + user_content + "'></img>")
    }
    contents.push(ctt)
    attrs = [
        ['user-type', 'decorate_pic'],
        ['user-topic', user_topic],
        ['user-title', randomString()],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var itemdiv = add_block(2, 1, contents, attrs)

    var delete_on_click = function() {
        ctt.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/decorate_pic.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].imageURL + '</h5>'))
    var text_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var text_input = $("<textarea class='form-control form-control-user'  style='text-align:center;width:250px'/>")
    text_input_div.append(text_input)
    editForm.append(text_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center;margin-bottom:5px"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center;width:250px;min-width:250px'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        modifyDia.close()
        if(text_input.val().endsWith(".mp4") || text_input.val().endsWith(".webm") || text_input.val().endsWith(".ogg")){
            var newCTT = $("<video style='height:100%;width:100%' src='" + text_input.val() + "' controls loop></video>")
            ctt.parent().html(newCTT)
            ctt = newCTT
        }else
        {
            var newCTT = $("<img style='height:100%;width:100%' src='" + text_input.val() + "'></img>")
            ctt.parent().html(newCTT)
            ctt = newCTT
        }
        console.log(text_input.val())
        console.log(itemdiv)
        itemdiv.attr("user-content", text_input.val())
        itemdiv.attr("user-topic", topic_input.val())
        topic.text(topic_input.val())
    })
    client.on('message', function(topic1, message1) {
        if (isAlive && isRunning)
            if (topic1.split("/")[(isMixly ? 3 : 2)] == topic.text()) {
                var msg = message1.toString()
                if (msg.endsWith(".mp4") || msg.endsWith(".webm") || msg.endsWith(".ogg")){
                    var newCTT = $("<video style='height:100%;width:100%' src='" + msg + "' controls loop></video>")
                    ctt.parent().html(newCTT)
                    ctt = newCTT
                }else
                {
                    var newCTT = $("<img style='height:100%;width:100%' src='" + msg + "'></img>")
                    ctt.parent().html(newCTT)
                    ctt = newCTT
                }
                itemdiv.attr("user-content", msg)
            }
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5) && !isRunning) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                //copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                //styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            text_input.val(ctt.attr("src"))
            topic_input.val(topic.text())
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
    itemdiv.resizable({
        minWidth: 20,
        minHeight: 20,
        onStopResize: function() {
            var stdLeft = parseInt(itemdiv.css('left')) - parseInt(itemdiv.css('left')) % 20 + (parseInt(itemdiv.css('left')) % 20 > 10 ? 1 : 0) * 20
            var stdTop = parseInt(itemdiv.css('top')) - parseInt(itemdiv.css('top')) % 20 + (parseInt(itemdiv.css('top')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('left', stdLeft)
            itemdiv.css('top', stdTop)
            var stdWidth = parseInt(itemdiv.css('width')) - parseInt(itemdiv.css('width')) % 20 + (parseInt(itemdiv.css('width')) % 20 > 10 ? 1 : 0) * 20
            var stdHeight = parseInt(itemdiv.css('height')) - parseInt(itemdiv.css('height')) % 20 + (parseInt(itemdiv.css('height')) % 20 > 10 ? 1 : 0) * 20
            itemdiv.css('width', stdWidth)
            itemdiv.css('height', stdHeight)
        }
    })
}

function add_camera(user_title, user_topic, user_content, user_style, title_style) {
    var isAlive = true
    var contents = []
    var title = $("<h4 class='userTitle'>" + user_title + "</h4>")
    title.attr("hidden", title_style)
    contents.push(title)
    var topicDiv = $("<div class='topicDiv'/>")
    var topic = $("<span class='index-topic' style='margin:0;color:#858796;'>" + user_topic + "</span>")
    topicDiv.append($("<i class='fa fa-podcast' style='color:#858796;margin-right:3px'></i>"))
    topicDiv.append(topic)
    var cameraDiv = $("<div class='cameraDiv'/>")
    contents.push(cameraDiv)
    // add a real-time web camera
    var video = $("<video autoplay style='width:100%;height:100%;'/>")
    cameraDiv.append(video)
    navigator.mediaDevices.getUserMedia({
        video: {
            width: {
                ideal: 1280
            },
            height: {
                ideal: 720
            },
            frameRate: {
                ideal: 30,
                min: 10
            }
        },
        audio: false
    }).then(function(stream) {
        video[0].srcObject = stream
        // send MQTT message: base64 encoded image, topic: user_topic, fps: fps, resolution: resolution
        var canvas = $("<canvas />")
        var context = canvas[0].getContext('2d')
        var timer1 = setInterval(function() {
            if(isRunning && isAlive && fps == 1)
            {   
                // set canvas size
                canvas[0].width = resolutionX
                canvas[0].height = resolutionY
                context.drawImage(video[0], 0, 0, resolutionX, resolutionY)
                var dataURL = canvas[0].toDataURL('image/jpeg', 0.5)
                publish(user_topic, dataURL)
            }
        }, 1000)
        var timer2 = setInterval(function() {
            if(isRunning && isAlive && fps == 2)
            {
                canvas[0].width = resolutionX
                canvas[0].height = resolutionY
                context.drawImage(video[0], 0, 0, resolutionX, resolutionY)
                var dataURL = canvas[0].toDataURL('image/jpeg', 0.5)
                publish(user_topic, dataURL)
            }
        }, 500)
    }).catch(function(err) {
        showtext("Error: " + err.name + " " + err.message)
    })


    var resolution = user_content.split(",")[0]
    var fps = parseInt(user_content.split(",")[1])
    var resolutionX = parseInt(resolution.split("x")[0])
    var resolutionY = parseInt(resolution.split("x")[1])
    attrs = [
        ['user-type', 'camera'],
        ['user-title', user_title],
        ['user-topic', user_topic],
        ['user-content', user_content],
        ['title-hidden', title_style]
    ]
    var itemdiv = add_block(4, 3, contents, attrs)

    var delete_on_click = function() {
        title.parent().parent().remove();
        isAlive = false
        if (tbd)
            tbd.remove()
    }
    var edit_on_click = function() {
        modifyDia.showModal()
        if (tbd)
            tbd.remove()
    }
    var editForm = $('<div class="nnt"/>')
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><img src="icons/output_text.svg" style="width:45px;"></div>'))
    editForm.append($('<h5 style="text-align:center">' + JSLang[lang].unitName + '</h5>'))
    var title_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var title_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    title_input_div.append(title_input)
    editForm.append(title_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].messTopic + '</h5>'))
    var topic_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var topic_input = $("<input class='form-control form-control-user'  style='text-align:center'/>")
    topic_input_div.append(topic_input)
    editForm.append(topic_input_div)
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].resolution + '</h5>'))
    var resolution_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var resolution_input = $("<select class='form-control form-control-user' style='text-align:center;cursor:pointer'/>")
    resolution_input_div.append(resolution_input)
    resolution_input.append($("<option value='160x120'>160x120</option>"))
    resolution_input.append($("<option value='320x240'>320x240</option>"))
    editForm.append(resolution_input_div)
    // fps selection
    editForm.append($('<h5 style="margin-top:15px;text-align:center">' + JSLang[lang].fps + '</h5>'))
    var fps_input_div = $('<div style="display:flex;flex-direction:row;align-items:center"/>')
    var fps_input = $("<select class='form-control form-control-user' style='text-align:center;cursor:pointer'/>")
    fps_input_div.append(fps_input)
    fps_input.append($("<option value='1'>1</option>"))
    fps_input.append($("<option value='2'>2</option>"))
    editForm.append(fps_input_div)
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        if (getByteLen(title_input.val()) > 0 && getByteLen(title_input.val()) < 21) {
            var re = /^[a-z0-9]+$/i;
            if (getByteLen(topic_input.val()) > 0 && getByteLen(topic_input.val()) < 11)
                if (true) {
                    if (countSubstr(grid.html(), 'user-title=\"' + title_input.val() + '\"', false) <= (title_input.val() == title.text() ? 1 : 0)) {
                        title.parent().parent().attr('user-title', title_input.val())
                        title.parent().parent().attr('user-topic', topic_input.val())
                        if (title.parent().parent().attr('user-content') == undefined)
                            title.parent().parent().attr('user-content', "")
                        title.text(title_input.val())
                        topic.text(topic_input.val())
                        resolution = resolution_input.val()
                        fps = parseInt(fps_input.val())
                        resolutionX = parseInt(resolution.split("x")[0])
                        resolutionY = parseInt(resolution.split("x")[1])
                        // set user-content
                        title.parent().parent().attr('user-content', resolution + "," + fps)
                        modifyDia.close()
                    } else
                        showtext(JSLang[lang].sameUnit)
                } else
                    showtext("")
            else
                showtext(JSLang[lang].topicLenIllegal)
        } else
            showtext(JSLang[lang].nameLenIllegal)
    })
    var cancelEdit = $('<a class="btn btn-danger btn-circle" style="box-shadow:1px 1px 5px #e74a3b"><i class="fa fa-arrow-left"></i></a>')
    cancelEdit.click(function() {
        modifyDia.close()
    })
    bottomDiv.append(cancelEdit)
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    var showEditBubble = function(event) {
        if(tbd)
            tbd.remove()
        if (typeof startX != "undefined" && (startX - endX < 5 && endX - startX < 5) && (startY - endY < 5 && endY - startY < 5)) {
            var editButton = $('<a class="btn btn-primary btn-circle bbbt"><i class="fa fa-cog"></i></a>')
            var deleteButton = $('<a class="btn btn-danger btn-circle bbbt"><i class="fa fa-trash"></i></a>')
            var bubble = $('<div style="text-align:center"/>')
            bubble.append(topicDiv)
            var d = dialog({
                align: 'top',
                content: bubble[0],
                quickClose: true,
                autofocus: false
            });
            tbd = d;
            editButton.click(edit_on_click)
            deleteButton.click(delete_on_click)
            if (!isRunning)
                bubble.append(editButton)
            if (!isRunning)
                bubble.append(deleteButton)
            if (!isRunning)
                {
                copyButton.attr("user-origin", title.text())
                bubble.append(copyButton)
                styleButton.attr("user-origin", title.text())
                bubble.append(styleButton)
                helpButton.attr("user-origin", attrs[0][1])
                bubble.append(helpButton)
            }
            title_input.val(title.text())
            topic_input.val(topic.text())
            resolution_input.val(resolution)
            fps_input.val(fps)
            if (!d.open)
            {
                d.show(itemdiv[0]);
                setTimeout(function() {
                    $(".ui-popup-backdrop").css("pointer-events", "auto")
                },100)
            }
            else
                d.close()
        }
    }
    if (window.screen.width > 800)
    {
        itemdiv.click(showEditBubble)
        itemdiv.on('contextmenu', function(event) {
            event.preventDefault()
            event.stopPropagation()
            showEditBubble(event)
        })
    }
    else
        itemdiv[0].addEventListener('touchend', function(event) {
            event.preventDefault()
            showEditBubble(event)
        })
    itemdiv[0].addEventListener('touchmove', function(e) {
        e.preventDefault()
    })
    if (user_style != undefined)
        itemdiv.attr('style', user_style)
}

function init_layout() {
    grid = $("#grid")
    grid2 = $("#grid2")
}

var standardWidth = 100

function get_width() {
    fullWidth = window.screen.width
    if ((fullWidth - 84) / 3 < 100)
        standardWidth = (fullWidth - 84) / 3
}

var copyButton = $('<a class="btn btn-success btn-circle bbbt"><i class="fa fa-copy"></i></a>')
copyButton.click(function() {
    // copy the item
    var itemTitle = $(this).attr("user-origin")
    var itemdiv = $("div[user-title='" + itemTitle + "']")
    // get user-type, user-topic, user-content, user-style
    var user_type = itemdiv.attr("user-type")
    var user_topic = itemdiv.attr("user-topic")
    var user_content = itemdiv.attr("user-content")
    var user_style = itemdiv.attr("style")
    // add the item, use the function of user-type
    toolkits[user_type](itemTitle + "_copy", user_topic, user_content, user_style)

})

var styleButton = $('<a class="btn btn-danger btn-circle bbbt button-7colors"><i class="fa fa-paint-brush"></i></a>')
styleButton.click(function() {
    if(tbd)
        tbd.remove()
    // a dialog that is like "modifyDia" but for style
    var itemTitle = $(this).attr("user-origin")
    var itemdiv = $("div[user-title='" + itemTitle + "']")
    var editForm = $('<div class="nnt" />')
    editForm.css("width", "250px")
    editForm.append($('<div style="margin-top:-63px;margin-left:82.5px;margin-bottom:15px;box-shadow: 1px 1px 20px #4e73df;background-color:white;width:75px;height:75px;padding:40px;border-radius:80px;border:solid #4e73df 3px;display:flex;align-items:center;justify-content:center"><i class="fa fa-paint-brush" style="color:#4e73df;font-size:45px"></i></div>'))
    editForm.append($('<h5 style="text-align:center">组件标题</h5>'))
    // add a switch like "modeButton" to choose the style
    var modeButton = $("<label class='switch' style='margin-bottom:0'></label>")
    var modeCheckbox = $("<input type='checkbox'>")
    modeCheckbox.click(function() {
        if (modeCheckbox.prop("checked"))
        {
            // find title in the itemdiv, show it
            itemdiv.find("h4").attr("hidden", true)
            itemdiv.attr("title-hidden", true)
        }
        else
        {
            itemdiv.find("h4").attr("hidden", false)
            itemdiv.attr("title-hidden", false)
        }
    })
    if (itemdiv.attr("title-hidden") == "true")
        modeCheckbox.prop("checked", true)
    else
        modeCheckbox.prop("checked", false)
    var modeCheckDiv = $("<div class='slider2 round'></div>")
    modeButton.append(modeCheckbox)
    modeButton.append(modeCheckDiv)
    var modeDiv = $("<div style='display:flex;margin-top:10px;flex-direction:row;align-items:center;justify-content:center'/>")
    modeDiv.append($("<span style='font-size:1rem;margin-right:10px;color:#4e73df;font-weight:bold'>" + "显示"+"</span>"))
    modeDiv.append(modeButton)
    modeDiv.append($("<span style='font-size:1rem;margin-left:10px;color:#e74a3b;font-weight:bold'>" + "隐藏" + "</span>"))
    editForm.append(modeDiv)
    // background color
    editForm.append($('<h5 style="margin-top:15px;text-align:center">背景颜色</h5>'))
    var colorDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center'/>")
    var colorInput = $("<input class='form-control form-control-user'  style='text-align:center;width:250px;min-width:250px'/>")
    colorInput.val(itemdiv.css("background-color"))
    colorDiv.append(colorInput)
    editForm.append(colorDiv)
    colorInput.on('change', function() {
        itemdiv.css("background-color", colorInput.val())
    })
    // title color
    editForm.append($('<h5 style="margin-top:15px;text-align:center">标题颜色</h5>'))
    var titleColorDiv = $("<div style='display:flex;flex-direction:row;align-items:center;justify-content:center'/>")
    var titleColorInput = $("<input class='form-control form-control-user'  style='text-align:center;width:250px;min-width:250px'/>")
    titleColorInput.val(itemdiv.find("h4").css("color"))
    titleColorDiv.append(titleColorInput)
    editForm.append(titleColorDiv)
    titleColorInput.on('change', function() {
        itemdiv.find("h4").css("color", titleColorInput.val())
    })
    var bottomDiv = $('<div style="width:100%;margin-top:15px;display:flex;flex-direction:row;align-items:center;justify-content:space-around"/>')
    var confirmEdit = $('<a class="btn btn-primary btn-circle" style="margin-right:10px;box-shadow:1px 1px 5px #4e73df"><i class="fa fa-check"></i></a>')
    bottomDiv.append(confirmEdit)
    confirmEdit.click(function() {
        modifyDia.close()
    })
    editForm.append(bottomDiv)
    var modifyDia = dialog({
        content: editForm[0],
        cancel: false
    })
    modifyDia.showModal()
})

var helpButton = $('<a class="btn btn-dark btn-circle bbbt"><i class="fa fa-book"></i></a>')
helpButton.click(function() {
    if(tbd)
        tbd.remove()
    var helpurl = window.location.href.replace("projects", "documentation/") + "#" + $(this).attr("user-origin")
    // add a floating window to show the help, it can be moved and closed
    var helpWindow = $('<div style=""/>')
    helpWindow.css("width", "300px")
    helpWindow.css("height", "500px")
    helpWindow.append($('<iframe src="' + helpurl + '" style="width:100%;height:100%;border:none"/>'))
    // use a div to show the help, it is movable and closable
    var helpDiv = $('<div style="z-index:1000;position:absolute;left:20px;top:80px;background-color:white;border-radius:10px;padding:20px;box-shadow: 1px 1px 20px #4e73df;overflow:auto"/>')
    helpDiv.append(helpWindow)
    // draw a close button on the help window
    var closeButton = $('<a class="btn btn-sm btn-danger btn-circle" style="position:absolute;top:0;right:0"><i class="fa fa-times"></i></a>')
    closeButton.click(function() {
        helpDiv.remove()
    }
    )
    helpWindow.append(closeButton)
    // make it draggable
    helpDiv.draggable(
    )
    $("body").append(helpDiv)
        
})