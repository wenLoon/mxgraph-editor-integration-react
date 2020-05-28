import React, { useState, useEffect } from 'react';
import './../../resource/resources/index';
import './../../resource/www/js/Init';
import './../../resource/www/deflate/pako.min';
import './../../resource/www/deflate/base64';
import './../../resource/www/jscolor/jscolor';
import './../../resource/www/sanitizer/sanitizer.min';
import './../../resource/www/js/EditorUi';
import './../../resource/www/js/Editor';
import './../../resource/www/js/Sidebar';
import './../../resource/www/js/Graph';
import './../../resource/www/js/Format';
import './../../resource/www/js/Shapes';
import './../../resource/www/js/Actions';
import './../../resource/www/js/Menus';
import './../../resource/www/js/Toolbar';
import './../../resource/www/js/Dialogs';
import './../../resource/www/styles/grapheditor.css';

function EditorUI() {
    /* js connect body element with class */
    document.getElementsByTagName('body')[0].className = 'geEditor';
    /* js connect body element with class */

    var bundle = mxResources.getDefaultBundle(RESOURCE_BASE, mxLanguage) ||
        mxResources.getSpecialBundle(RESOURCE_BASE, mxLanguage);

    // Fixes possible asynchronous requests
    mxUtils.getAll([bundle, STYLE_PATH + '/default.xml'], function (xhr) {
        // Adds bundle text to resources
        mxResources.parse(xhr[0].getText());

        // Configures the default graph theme
        var themes = new Object();
        themes[Graph.prototype.defaultThemeName] = xhr[1].getDocumentElement();

        // Main
        new EditorUi(new Editor(urlParams['chrome'] == '0', themes));
    }, function () {
        document.body.innerHTML = '<center style="margin-top:10%;">Error loading resource files. Please check browser console.</center>';
    });
}

function Mxgraph() {
    const [count, useCount] = useState(0);
    useEffect(() => {
        EditorUI(); 
    }, [])

    return (
        <div>
            Mxgraph
        </div>
    )
}

export default Mxgraph;