function url_v6(url) {
    if (!url) {
        url = location.search.substring(1);
    } else {
        url = url.substr(url.indexOf('?') + 1);
    }
    var args = new Object();
    var query = decodeURI(url);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos + 1);
        try {
            args[argname] = decodeURI(value);
        } catch (e) {
            args[argname] = value;
        }
    }
    return args;
}
function null2str(obj) {
    return obj ? obj : obj === 0 ? 0 : '';
}
var bearForm = {
    buildTextValue: function (_el) {
        var json = [], rst = true, msg = '';
        _el.find('.global').each(function () {
            if (!rst) return;
            json[this.name] = this.value;
            if (this.required && this.value === '') {
                rst = false;
                msg = this.name+'不能为空';
            }
        });
        return { rst: rst, msg: msg, json: json }
    },
    buildRadioValue: function (_el) {
        var json = {};
        _el.find('input:radio.global').each(function () {
            json[this.name] = this.value;
        });
        return json;
    },
    buildCheckboxValue: function (_el) {
        var json = [];
        _el.find('input:checkbox.global').each(function () {
            var name = this.name;
            if (!json[name]) json[name] = [];
            if (this.checked) json[name].push(this.value);
        });
        return json;
    },
    setTextValue: function (_el, json) {
        _el.find('.global').each(function () {
            this.value = null2str(json[this.name]);
        });
    },
    setRadioValue: function (_el, json) {
        _el.find('input:radio.global').each(function () {
            if (this.value === json[this.name]) this.checked = true;
        });
    },
    setCheckboxValue:function(_el,json){
        _el.find('input:checkbox.global').each(function(){
            if($.inArray(this.value,json[this.name])>=0) this.checked = true;
        });
    },
    viewTextValue:function(_el,json){
        _el.find('td.td-y').each(function(){
            var _key = $(this).data('key');
            if(_key) this.innerHTML = null2str(json[_key]);
        });
        var cks = json.cks;
        _el.find('td.td-z').each(function(){
            var _key = $(this).data('key');
            if(_key) this.innerHTML = null2str(json[_key].join(','));
        });
    },
    buildFormData:function(_el){
        var data={};
        data = this.buildTextValue(_el);
        if(!data.rst){
            return data;
        }
        data = $.extend(this.buildRadioValue(_el),data.json);
        data.cks = this.buildCheckboxValue(_el);
        return data;
    },
    setFormData:function(_el,json){
        this.setTextValue(_el,json);
        this.setRadioValue(_el,json);
        this.setCheckboxValue(_el,json.cks);
    }
}
var bearTable = {
    events:function(_el){
        _el.on('click','.addRepeatRow',function(){
            var _this = $(this);
            _key = _this.data('key');
            _this.parents('table.repeat').find('tbody').append(document.getElementById('tpl-'+_key).innerHTML);
        });
    }
}
