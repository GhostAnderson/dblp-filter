// ==UserScript==
// @name         dblp filter
// @namespace    http://tampermonkey.net/
// @version      2024-11-29
// @description  Filtering dblp result with including keywords and excluding keywords.
// @author       Laurentiusia
// @match        https://dblp.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dblp.org
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    function handleSubmit(){
        var input1 = $('#textbox1').val();
        var input2 = $('#textbox2').val();
        $(".entry").each(function (index, item){
            $(item).show()
        })
        include_with(input1)
        exclude_with(input2)
    }

    function exclude_with(keywords){
        if (keywords === ""){
            return
        }
        keywords.split(';').forEach(function (keyword){
            $(".entry").each(function (index, item){
                var text = $(item).find("cite").find(".title").text()
                if (text.toLowerCase().includes(keyword.toLowerCase()))
                {
                    $(item).hide()
                }
            })
        })
    }

    function include_with(keywords){
        if (keywords === ""){
            return
        }
        keywords.split(';').forEach(function (keyword){
            $(".entry").each(function (index, item){
                var text = $(item).find("cite").find(".title").text()
                if (!text.toLowerCase().includes(keyword.toLowerCase()))
                {
                    $(item).hide()
                }
            }
                            )
        })
    }

    $(".publ-list").ready(function () {
        // 创建固定容器的 div
        var $container = $('<div></div>')
        .attr('id', 'fixed-container')
        .css({
            position: 'fixed',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '200px',
            padding: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',
            borderRadius: '5px',
            textAlign: 'center'
        });

        // 创建第一个文本框
        var $textbox1 = $('<textarea>')
        .attr('type', 'text')
        .attr('id', 'textbox1')
        .attr('placeholder', 'include;')
        .css({
            width: '90%',
            margin: '5px 0',
            padding: '5px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '3px'
        });

        // 创建第二个文本框
        var $textbox2 = $('<textarea>')
        .attr('type', 'text')
        .attr('id', 'textbox2')
        .attr('placeholder', 'exclude')
        .css({
            width: '90%',
            margin: '5px 0',
            padding: '5px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '3px'
        });

        // 创建提交按钮
        var $button = $('<button></button>')
        .attr('id', 'submit-button')
        .text('submit')
        .css({
            width: '95%',
            padding: '5px',
            fontSize: '14px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
        })
        .hover(
            function () {
                $(this).css('background-color', '#0056b3'); // 鼠标悬停
            },
            function () {
                $(this).css('background-color', '#007bff'); // 鼠标移出
            }
        )
        .click(function () {
            handleSubmit();
        });

        $('#textbox1, #textbox2').on('keydown', function (event) {
            if (event.key === 'Enter') {
                handleSubmit(); // 调用提交处理函数
            }
        });


        // 将文本框和按钮添加到容器中
        $container.append($textbox1).append($textbox2).append($button);

        // 将容器添加到页面的 body 中
        $('body').append($container);
    });


})();
