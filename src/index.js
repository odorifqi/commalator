const App = () => {
  const [data, dispatchData] = React.useReducer(dataReducer, {
    total: 0,
    price: { perkg: 0, percent: 0 },
    personData: {},
  });

  function getPrice(e) {
    dispatchData({ type: "SET_PRICE", payload: e });
  }

  function addList(x, name, val) {
    dispatchData({
      type: "SET_PERSON_DATA",
      payload: { id: x, name: name, value: val },
    });
  }

  function removeList(x) {
    dispatchData({
      type: "REMOVE_PERSON_DATA",
      payload: x,
    });
  }

  React.useEffect(() => {
    let total = 0;
    for (const i in data.personData) {
      total += parseInt(data.personData[i]["value"]);
    }
    dispatchData({ type: "SET_TOTAL", payload: total });
  }, [data.personData]);

  return (
    <React.Fragment>
      <div className="yellowed">
        <h1>COMMALATOR</h1>
        <DateToday />
      </div>
      <div id="main">
        <div className="main-div wider">
          <InputPerson addList={addList} removeList={removeList} />
          <div id="div-total-weight">
            <p className="highlight" style={{ fontSize: "1.7em" }}>
              Total
            </p>
            <p id="total">{data.total} kg</p>
          </div>
        </div>
        <div className="main-div wider">
          <DetailInput getPrice={getPrice} />
          <DetailResult
            price={data.price}
            total={data.total}
            personData={data.personData}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

function dataReducer(state, action) {
  switch (action.type) {
    case "SET_TOTAL":
      return { ...state, total: action.payload };

    case "SET_PRICE":
      return {
        ...state,
        price: {
          perkg: action.payload.target[0].value,
          percent: action.payload.target[1].value,
        },
      };

    case "SET_PERSON_DATA":
      return {
        ...state,
        personData: {
          ...state.personData,
          [action.payload.id]: action.payload,
        },
      };

    case "REMOVE_PERSON_DATA":
      return {
        ...state,
        personData: Object.filter(
          state.personData,
          (s) => s.id !== action.payload
        ),
      };

    default:
      throw new Error();
  }
}

Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});

function DetailInput({ getPrice }) {
  const handleResult = (e) => {
    e.preventDefault();
    getPrice(e);
  };

  return (
    <div>
      <h2>Rincian</h2>
      <form action="" onSubmit={handleResult}>
        <p className="highlight">Harga per kg(Rp)</p>
        <div className="detail-input-div">
          <input
            type="number"
            name="price"
            id="price"
            placeholder="ex:11000"
            required
          />
        </div>
        <p className="highlight">Persentase (%)</p>
        <div className="detail-input-div">
          <input
            type="number"
            name="percent"
            id="percent"
            placeholder="ex:50"
            required
          />
        </div>
        <input id="detailBtn" type="submit" value="submit" />
      </form>
    </div>
  );
}

function DetailResult({ price, total, personData }) {
  const totalPrice = price.perkg * total;
  const percent = price.percent * 0.01;
  const percentPrice = totalPrice * percent;

  const person = [];

  if (price.perkg) {
    for (const [key, value] of Object.entries(personData)) {
      person.push({
        name: value.name,
        value: (totalPrice * percent * value.value) / total,
        key: value.id,
      });
    }
  }

  return (
    <div id="detail-result-div">
      <SubDR key="Hasil total" title="Hasil total">
        Rp{totalPrice.toLocaleString("id-ID")}
      </SubDR>
      <SubDR key="Pendapatan" title="Pendapatan">
        Rp{percentPrice.toLocaleString("id-ID")}
      </SubDR>
      <SubDR key="per pihak" title="Pendapatan per pihak">
        {person.map((x) => (
          <ListPerson x={x} key={`list_${x.key}`} />
        ))}
      </SubDR>
    </div>
  );
}

function ListPerson({ x }) {
  return (
    <React.Fragment>
      <span>
        {x.name || "unknown"}: Rp{x.value.toLocaleString("id-ID")}
      </span>
      <hr />
    </React.Fragment>
  );
}

function SubDR({ children, title }) {
  return (
    <div className="sub-dr">
      <p className="highlight">{title}</p>
      <div className="sub-result-div">
        <p id="priceTotal" className="result-text">
          {children}
        </p>
      </div>
    </div>
  );
}

const InputPerson = ({ addList, removeList }) => {
  const [personList, dispatch] = React.useReducer(listReducer, [{ key: 0 }]);

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

  return (
    <React.Fragment>
      <div className="clearfix">
        <MyButton handleClick={addPerson}>+</MyButton>
      </div>
      {personList.map((p) => (
        <PersonObj
          key={`person_${p.key + 1}`}
          i={p.key}
          addList={handleAddList}
          removeList={handleRemoveList}
          removePerson={removePerson}
        />
      ))}
    </React.Fragment>
  );
};

function listReducer(state, action) {
  switch (action.type) {
    case "ADD":
      let sleng = state.length;
      return [
        ...state,
        {
          key: sleng !== 0 ? state[sleng - 1].key + 1 : sleng,
        },
      ];

    case "REMOVE":
      return state.filter(
        (s) => state[state.indexOf(s)].key !== action.payload
      );

    default:
      throw new Error();
  }
}

const PersonObj = ({ i, addList, removeList, removePerson }) => {
  const [personObj, dispatchPerson] = React.useReducer(personObjReducer, {
    name: "",
    input: "",
    value: 0,
  });

  function sum() {
    dispatchPerson({
      type: "SET_VALUE",
      payload: () => {
        const val = personObj.input
          .split(",")
          .reduce((t, v) => parseInt(t) + parseInt(v));
        return isNaN(val) ? alert("not a number") : val;
      },
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

  React.useEffect(() => {
    if (personObj.value) {
      addList(i, personObj.name, personObj.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personObj.name, personObj.value]);

  return (
    <div className="person-div focus">
      <input
        id={"name_" + i}
        className="name-label"
        placeholder="nama"
        type="text"
        value={personObj.name}
        onChange={handleName}
      />
      <MyButton
        className="clearfix"
        btnName="x"
        handleClick={() => handleRemove(i)}
      />
      <br />
      <input
        type="text"
        name="value"
        id={"value_" + i}
        placeholder="10, 25, 31, ..."
        value={personObj.input}
        onChange={handleInput}
      />
      <MyButton btnName="submit" handleClick={sum} />
      <p>{personObj.value} kg</p>
    </div>
  );
};

function personObjReducer(state, action) {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };

    case "SET_INPUT":
      return { ...state, input: action.payload };

    case "SET_VALUE":
      return { ...state, value: action.payload() };

    default:
      throw new Error();
  }
}

function MyButton({ btnName, handleClick, children }) {
  return (
    <button type="button" onClick={handleClick}>
      {btnName || children}
    </button>
  );
}

function DateToday() {
  const tgl = new Date();
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const day = ["Minggu", "Senin", "Selasa", "Rabu", " Kamis", "Jumat", "Sabtu"];

  return (
    <p>
      Tanggal:{" "}
      <strong>
        {day[tgl.getDay()]}, {tgl.getDate()} {months[tgl.getMonth()]}{" "}
        {tgl.getFullYear()}{" "}
      </strong>
    </p>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
