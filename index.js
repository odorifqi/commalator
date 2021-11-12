var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App = function App() {
  var _React$useReducer = React.useReducer(dataReducer, {
    total: 0,
    price: { perkg: 0, percent: 0 },
    personData: {}
  }),
      _React$useReducer2 = _slicedToArray(_React$useReducer, 2),
      data = _React$useReducer2[0],
      dispatchData = _React$useReducer2[1];

  function getPrice(e) {
    dispatchData({ type: "SET_PRICE", payload: e });
  }

  function addList(x, name, val) {
    dispatchData({
      type: "SET_PERSON_DATA",
      payload: { id: x, name: name, value: val }
    });
  }

  function removeList(x) {
    dispatchData({
      type: "REMOVE_PERSON_DATA",
      payload: x
    });
  }

  React.useEffect(function () {
    var total = 0;
    for (var i in data.personData) {
      total += parseInt(data.personData[i]["value"]);
    }
    dispatchData({ type: "SET_TOTAL", payload: total });
  }, [data.personData]);

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
        { className: "main-div wider" },
        React.createElement(InputPerson, { addList: addList, removeList: removeList }),
        React.createElement(
          "div",
          { id: "div-total-weight" },
          React.createElement(
            "p",
            { className: "highlight", style: { fontSize: "1.7em" } },
            "Total"
          ),
          React.createElement(
            "p",
            { id: "total" },
            data.total,
            " kg"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "main-div wider" },
        React.createElement(DetailInput, { getPrice: getPrice }),
        React.createElement(DetailResult, {
          price: data.price,
          total: data.total,
          personData: data.personData
        })
      )
    )
  );
};

function dataReducer(state, action) {
  switch (action.type) {
    case "SET_TOTAL":
      return Object.assign({}, state, { total: action.payload });

    case "SET_PRICE":
      return Object.assign({}, state, {
        price: {
          perkg: action.payload.target[0].value,
          percent: action.payload.target[1].value
        }
      });

    case "SET_PERSON_DATA":
      return Object.assign({}, state, {
        personData: Object.assign({}, state.personData, _defineProperty({}, action.payload.id, action.payload))
      });

    case "REMOVE_PERSON_DATA":
      return Object.assign({}, state, {
        personData: Object.filter(state.personData, function (s) {
          return s.id !== action.payload;
        })
      });

    default:
      throw new Error();
  }
}

Object.filter = function (obj, predicate) {
  return Object.keys(obj).filter(function (key) {
    return predicate(obj[key]);
  }).reduce(function (res, key) {
    return Object.assign(res, _defineProperty({}, key, obj[key]));
  }, {});
};

function DetailInput(_ref) {
  var getPrice = _ref.getPrice;

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
}

function DetailResult(_ref2) {
  var price = _ref2.price,
      total = _ref2.total,
      personData = _ref2.personData;

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
        var _ref3 = _step.value;

        var _ref4 = _slicedToArray(_ref3, 2);

        var key = _ref4[0];
        var value = _ref4[1];

        person.push({
          name: value.name,
          value: totalPrice * percent * value.value / total,
          key: value.id
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
      { key: "Hasil total", title: "Hasil total" },
      "Rp",
      totalPrice.toLocaleString("id-ID")
    ),
    React.createElement(
      SubDR,
      { key: "Pendapatan", title: "Pendapatan" },
      "Rp",
      percentPrice.toLocaleString("id-ID")
    ),
    React.createElement(
      SubDR,
      { key: "per pihak", title: "Pendapatan per pihak" },
      person.map(function (x) {
        return React.createElement(ListPerson, { x: x, key: "list_" + x.key });
      })
    )
  );
}

function ListPerson(_ref5) {
  var x = _ref5.x;

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
    React.createElement("hr", null)
  );
}

function SubDR(_ref6) {
  var children = _ref6.children,
      title = _ref6.title;

  return React.createElement(
    "div",
    { className: "sub-dr" },
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
}

var InputPerson = function InputPerson(_ref7) {
  var addList = _ref7.addList,
      removeList = _ref7.removeList;

  var _React$useReducer3 = React.useReducer(listReducer, [{ key: 0 }]),
      _React$useReducer4 = _slicedToArray(_React$useReducer3, 2),
      personList = _React$useReducer4[0],
      dispatch = _React$useReducer4[1];

  function handleAddList(x, name, val) {
    addList(x, name, val);
  }

  function handleRemoveList(x) {
    removeList(x);
  }

  function addPerson() {
    dispatch({ type: "ADD" });
  }

  function removePerson(index) {
    dispatch({ type: "REMOVE", payload: index });
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      "div",
      { className: "clearfix" },
      React.createElement(
        MyButton,
        { handleClick: addPerson },
        "+"
      )
    ),
    personList.map(function (p) {
      return React.createElement(PersonObj, {
        key: "person_" + (p.key + 1),
        i: p.key,
        addList: handleAddList,
        removeList: handleRemoveList,
        removePerson: removePerson
      });
    })
  );
};

function listReducer(state, action) {
  switch (action.type) {
    case "ADD":
      var sleng = state.length;
      return [].concat(_toConsumableArray(state), [{
        key: sleng !== 0 ? state[sleng - 1].key + 1 : sleng
      }]);

    case "REMOVE":
      return state.filter(function (s) {
        return state[state.indexOf(s)].key !== action.payload;
      });

    default:
      throw new Error();
  }
}

var PersonObj = function PersonObj(_ref8) {
  var i = _ref8.i,
      addList = _ref8.addList,
      removeList = _ref8.removeList,
      removePerson = _ref8.removePerson;

  var _React$useReducer5 = React.useReducer(personObjReducer, {
    name: "",
    input: "",
    value: 0
  }),
      _React$useReducer6 = _slicedToArray(_React$useReducer5, 2),
      personObj = _React$useReducer6[0],
      dispatchPerson = _React$useReducer6[1];

  function sum() {
    dispatchPerson({
      type: "SET_VALUE",
      payload: function payload() {
        var val = personObj.input.split(",").reduce(function (t, v) {
          return parseInt(t) + parseInt(v);
        });
        return isNaN(val) ? alert("not a number") : val;
      }
    });
  }

  function handleName(e) {
    dispatchPerson({ type: "SET_NAME", payload: e.target.value });
  }
  function handleInput(e) {
    dispatchPerson({ type: "SET_INPUT", payload: e.target.value });
  }

  function handleRemove(i) {
    removePerson(i);
    removeList(i);
  }

  React.useEffect(function () {
    if (personObj.value) {
      addList(i, personObj.name, personObj.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personObj.name, personObj.value]);

  return React.createElement(
    "div",
    { className: "person-div focus" },
    React.createElement("input", {
      id: "name_" + i,
      className: "name-label",
      placeholder: "nama",
      type: "text",
      value: personObj.name,
      onChange: handleName
    }),
    React.createElement(MyButton, {
      className: "clearfix",
      btnName: "x",
      handleClick: function handleClick() {
        return handleRemove(i);
      }
    }),
    React.createElement("br", null),
    React.createElement("input", {
      type: "text",
      name: "value",
      id: "value_" + i,
      placeholder: "10, 25, 31, ...",
      value: personObj.input,
      onChange: handleInput
    }),
    React.createElement(MyButton, { btnName: "submit", handleClick: sum }),
    React.createElement(
      "p",
      null,
      personObj.value,
      " kg"
    )
  );
};

function personObjReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return Object.assign({}, state, { name: action.payload });

    case "SET_INPUT":
      return Object.assign({}, state, { input: action.payload });

    case "SET_VALUE":
      return Object.assign({}, state, { value: action.payload() });

    default:
      throw new Error();
  }
}

function MyButton(_ref9) {
  var btnName = _ref9.btnName,
      handleClick = _ref9.handleClick,
      children = _ref9.children;

  return React.createElement(
    "button",
    { type: "button", onClick: handleClick },
    btnName || children
  );
}

function DateToday() {
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
}

ReactDOM.render(React.createElement(
  React.StrictMode,
  null,
  React.createElement(App, null)
), document.getElementById("root"));