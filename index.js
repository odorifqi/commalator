var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App = function App() {
  var _React$useState = React.useState(1),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      personNumber = _React$useState2[0],
      setpersonNumber = _React$useState2[1];

  var _React$useState3 = React.useState(0),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      total = _React$useState4[0],
      setTotal = _React$useState4[1];

  var _React$useState5 = React.useState({ perkg: 0, percent: 0 }),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      price = _React$useState6[0],
      setPrice = _React$useState6[1];

  var _React$useState7 = React.useState({}),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      personData = _React$useState8[0],
      setPersonData = _React$useState8[1];

  var getPrice = function getPrice(e) {
    setPrice({ perkg: e.target[0].value, percent: e.target[1].value });
  };

  var getPersonData = function getPersonData(x, name, val) {
    setPersonData(function (prev) {
      return Object.assign({}, prev, _defineProperty({}, x, { id: name, value: val }));
    });
  };

  React.useEffect(function () {
    console.log("app");
    var total = 0;
    for (var i in personData) {
      total += parseInt(personData[i]["value"]);
    }
    setTotal(function () {
      return total;
    });
  }, [personData, setTotal]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "yellowed" },
      React.createElement(
        "h1",
        null,
        "COMMALATOR"
      ),
      React.createElement(DateToday, null)
    ),
    React.createElement(
      "div",
      { id: "main" },
      React.createElement(
        "div",
        { className: "main-div" },
        React.createElement(
          "div",
          { className: "clearfix" },
          React.createElement(
            Button,
            { handleClick: function handleClick() {
                return setpersonNumber(function (x) {
                  return x + 1;
                });
              } },
            "+"
          )
        ),
        React.createElement(InputPerson, {
          personNumber: personNumber,
          getPersonData: getPersonData
        }),
        React.createElement(
          "h2",
          null,
          "Total: ",
          total,
          " kg"
        )
      ),
      React.createElement(
        "div",
        { className: "main-div" },
        React.createElement(DetailInput, { getPrice: getPrice }),
        React.createElement(DetailResult, { price: price, total: total, personData: personData })
      )
    )
  );
};

var Button = function Button(_ref) {
  var btnName = _ref.btnName,
      handleClick = _ref.handleClick,
      children = _ref.children;

  return React.createElement(
    "button",
    { type: "button", onClick: handleClick },
    btnName || children
  );
};

var DateToday = function DateToday() {
  var tgl = new Date();
  var months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  var day = ["Minggu", "Senin", "Selasa", "Rabu", " Kamis", "Jumat", "Sabtu"];

  return React.createElement(
    "p",
    null,
    "Tanggal:",
    " ",
    React.createElement(
      "strong",
      null,
      day[tgl.getDay()],
      ", ",
      tgl.getDate(),
      " ",
      months[tgl.getMonth()],
      " ",
      tgl.getFullYear(),
      " "
    )
  );
};

var DetailInput = function DetailInput(_ref2) {
  var getPrice = _ref2.getPrice;

  var handleResult = function handleResult(e) {
    e.preventDefault();
    getPrice(e);
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "h2",
      null,
      "Rincian"
    ),
    React.createElement(
      "form",
      { action: "", onSubmit: handleResult },
      React.createElement(
        "p",
        { className: "highlight" },
        "Harga per kg(Rp)"
      ),
      React.createElement(
        "div",
        { className: "detail-input-div" },
        React.createElement("input", {
          type: "number",
          name: "price",
          id: "price",
          placeholder: "ex:11000",
          required: true
        })
      ),
      React.createElement(
        "p",
        { className: "highlight" },
        "Persentase (%)"
      ),
      React.createElement(
        "div",
        { className: "detail-input-div" },
        React.createElement("input", {
          type: "number",
          name: "percent",
          id: "percent",
          placeholder: "ex:50",
          required: true
        })
      ),
      React.createElement("input", { id: "detailBtn", type: "submit", value: "submit" })
    )
  );
};

var DetailResult = function DetailResult(_ref3) {
  var price = _ref3.price,
      total = _ref3.total,
      personData = _ref3.personData;

  var totalPrice = price.perkg * total;
  var percent = price.percent * 0.01;
  var percentPrice = totalPrice * percent;

  var person = [];

  if (price.perkg) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.entries(personData)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref4 = _step.value;

        var _ref5 = _slicedToArray(_ref4, 2);

        var key = _ref5[0];
        var value = _ref5[1];

        person.push({
          name: value.id,
          value: totalPrice * percent * value.value / total,
          key: key
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return React.createElement(
    "div",
    { id: "detail-result-div" },
    React.createElement(
      SubDR,
      { title: "Hasil total" },
      "Rp",
      totalPrice.toLocaleString("id-ID")
    ),
    React.createElement(
      SubDR,
      { title: "Pendapatan" },
      "Rp",
      percentPrice.toLocaleString("id-ID")
    ),
    React.createElement(
      SubDR,
      { title: "Pendapatan per pihak" },
      React.createElement(PerPerson, { person: person })
    )
  );
};

var PerPerson = function PerPerson(_ref6) {
  var person = _ref6.person;
  return person.map(function (x) {
    return React.createElement(ListPerson, { x: x, key: x.key });
  });
};

var ListPerson = function ListPerson(_ref7) {
  var x = _ref7.x;
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "span",
      null,
      x.name || "unknown",
      ": Rp",
      x.value.toLocaleString("id-ID")
    ),
    React.createElement("br", null)
  );
};

var SubDR = function SubDR(_ref8) {
  var children = _ref8.children,
      title = _ref8.title;
  return React.createElement(
    "div",
    null,
    React.createElement(
      "p",
      { className: "highlight" },
      title
    ),
    React.createElement(
      "div",
      { className: "sub-result-div" },
      React.createElement(
        "p",
        { id: "priceTotal", className: "result-text" },
        children
      )
    )
  );
};

var PersonObj = function PersonObj(_ref9) {
  var i = _ref9.i,
      setValue = _ref9.setValue;

  var _React$useState9 = React.useState(""),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      personName = _React$useState10[0],
      setPersonName = _React$useState10[1];

  var _React$useState11 = React.useState(""),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      personInput = _React$useState12[0],
      setPersonInput = _React$useState12[1];

  var _React$useState13 = React.useState(0),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      personValue = _React$useState14[0],
      setPersonValue = _React$useState14[1];

  var sum = function sum() {
    setPersonValue(function () {
      var val = personInput.split(",").reduce(function (t, v) {
        return parseInt(t) + parseInt(v);
      });
      return isNaN(val) ? alert("not a number") : val;
    });
  };

  React.useEffect(function () {
    if (personValue || personName) {
      setValue(i, personName, personValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personName, personValue]);

  return React.createElement(
    "div",
    { className: "person-div focus" },
    React.createElement("input", {
      id: "name_" + i,
      className: "name-label",
      placeholder: "nama",
      type: "text",
      value: personName,
      onChange: function onChange(e) {
        return setPersonName(e.target.value);
      }
    }),
    React.createElement("br", null),
    React.createElement("input", {
      type: "text",
      name: "value",
      id: "value_" + i,
      placeholder: "10, 25, 31, ...",
      value: personInput,
      onChange: function onChange(e) {
        return setPersonInput(e.target.value);
      }
    }),
    React.createElement(Button, { btnName: "submit", handleClick: sum }),
    React.createElement(
      "p",
      null,
      personValue,
      " kg"
    )
  );
};

var InputPerson = function InputPerson(_ref10) {
  var personNumber = _ref10.personNumber,
      getPersonData = _ref10.getPersonData;

  var person = [personNumber];

  var setValue = function setValue(x, name, val) {
    getPersonData(x, name, val);
  };

  for (var i = 0; i < personNumber; i++) {
    person[i] = React.createElement(PersonObj, { key: i, i: i, setValue: setValue });
  }

  return person;
};

ReactDOM.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(App, null)
), document.getElementById("root"));