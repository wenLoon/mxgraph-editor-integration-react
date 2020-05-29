import React, { useState, useEffect } from 'react';
import './../../public/resource/resources/index';
import './../../public/resource/www/js/Init';
import './../../public/resource/www/deflate/pako.min';
import './../../public/resource/www/deflate/base64';
import './../../public/resource/www/jscolor/jscolor';
import './../../public/resource/www/sanitizer/sanitizer.min';
import './../../public/resource/www/js/EditorUi';
import './../../public/resource/www/js/Editor';
import './../../public/resource/www/js/Sidebar';
import './../../public/resource/www/js/Graph';
import './../../public/resource/www/js/Format';
import './../../public/resource/www/js/Shapes';
import './../../public/resource/www/js/Actions';
import './../../public/resource/www/js/Menus';
import './../../public/resource/www/js/Toolbar';
import './../../public/resource/www/js/Dialogs';
import './../../public/resource/www/styles/grapheditor.css';
import './mxgraph.css';

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
        new EditorUi(new Editor(urlParams['chrome'] == '0', themes), document.getElementById('mymxgraphbody'));
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
        <div className="mymxgraphbody" id="mymxgraphbody">
            Mxgraph
        </div>
    )
}

export default Mxgraph;