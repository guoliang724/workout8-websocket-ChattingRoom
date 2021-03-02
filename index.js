//传入dom，error，以及rules
function ValidateDataForm(option) {
  const defaultOption = {
    formDom: document.getElementsByTagName("form")[0],
    error: "",
    rules: "",
  };
  const options = Object.assign({}, defaultOption, option);

  //
}
//传入表单自定义属性的值，获得此表单的数据
function getFieldData(container) {
  //得到表单域
  var dom = getFieldDom(container);
  var elements = getValidatedElements(dom);
  var datas = [];

  //查看
  elements.forEach((ele) => {
    var proName = ele.dataset[config.dataProp];
    //如果有自定义属性，把自定义属性的名字获取

    if (proName) {
      var value = ele.getAttribute(proName);
      if (ele.type == "checkbox" || ele.type == "radio") {
        if (ele.checked) datas.push(ele.getAttribute(config.dataDefaultProp));
      } else datas.push(value);
    }
    //如果没有自定义属性， 用默认属性value
    else {
      if (ele.type == "checkbox" || ele.type == "radio") {
        if (ele.checked) datas.push(ele.getAttribute(config.dataDefaultProp));
      } else {
        datas.push(ele.value);
      }
    }
  });
  if (datas.length == 0) return null;
  else if (datas.length == 1) return datas[0];
  else return datas;
}

//传入表单自定义属性的值，获得此表单域的dom
function getFieldDom(container) {
  const dom = document.getElementsByTagName("form")[0];
  const formItem = dom.querySelector(`[${config.dataFieldContainer}=${container}
  ]`);
  if (formItem) return formItem;
  else return null;
}
//传入表单域的dom后，获得此表单下的要验证的字段的dom
function getValidatedElements(dom) {
  var doms = dom.querySelectorAll(`[${config.dataField}]`);
  return doms;
}

//获得表单域的所有数据
function getFieldDatas() {
  var dom = document.querySelector(".form");

  var doms = dom.querySelectorAll(`[${config.dataFieldContainer}]`);
  var datas = [];
  doms.forEach((ele) => {
    var data = ele.getAttribute(config.dataFieldContainer);
    console.log("data", data);
    if (data) {
      datas.push(getFieldData(data));
    }
  });
  console.log(datas);
}

//
const config = {
  dataFieldContainer: "data-field-container", //
  dataField: "data-field", //
  dataProp: "prop",
  dataDefaultProp: "value",
  dataListener: "data-field-listener",
  dataDefaultListener: "chang",
  dataTrigger: "datafieldtrigger",
  dataFieldError: "data-field-error",
  dataDefaultError: "error",
};
console.log("doing.");
