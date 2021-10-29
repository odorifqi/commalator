const App = () => {
  const [personNumber, setpersonNumber] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [price, setPrice] = React.useState({ perkg: 0, percent: 0 });
  const [personData, setPersonData] = React.useState({});

  const getPrice = (e) => {
    setPrice({ perkg: e.target[0].value, percent: e.target[1].value });
  };

  const getPersonData = (x, name, val) => {
    setPersonData((prev) => ({ ...prev, [x]: { id: name, value: val } }));
  };

  React.useEffect(() => {
    console.log("app");
    let total = 0;
    for (const i in personData) {
      total += parseInt(personData[i]["value"]);
    }
    setTotal(() => total);
  }, [personData, setTotal]);

  return (
    <React.Fragment>
      <div className="yellowed">
        <h1>COMMALATOR</h1>
        <DateToday />
      </div>
      <div id="main">
        <div className="main-div">
          <div className="clearfix">
            <Button handleClick={() => setpersonNumber((x) => x + 1)}>+</Button>
          </div>
          <InputPerson
            personNumber={personNumber}
            getPersonData={getPersonData}
          />
          <h2>Total: {total} kg</h2>
        </div>
        <div className="main-div">
          <DetailInput getPrice={getPrice} />
          <DetailResult price={price} total={total} personData={personData} />
        </div>
      </div>
    </React.Fragment>
  );
};

const Button = ({ btnName, handleClick, children }) => {
  return (
    <button type="button" onClick={handleClick}>
      {btnName || children}
    </button>
  );
};

const DateToday = () => {
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
};

const DetailInput = ({ getPrice }) => {
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
};

const DetailResult = ({ price, total, personData }) => {
  const totalPrice = price.perkg * total;
  const percent = price.percent * 0.01;
  const percentPrice = totalPrice * percent;

  const person = [];

  if (price.perkg) {
    for (const [key, value] of Object.entries(personData)) {
      person.push({
        name: value.id,
        value: (totalPrice * percent * value.value) / total,
        key: key,
      });
    }
  }

  return (
    <div id="detail-result-div">
      <SubDR title="Hasil total">Rp{totalPrice.toLocaleString("id-ID")}</SubDR>
      <SubDR title="Pendapatan">Rp{percentPrice.toLocaleString("id-ID")}</SubDR>
      <SubDR title="Pendapatan per pihak">
        <PerPerson person={person} />
      </SubDR>
    </div>
  );
};

const PerPerson = ({ person }) =>
  person.map((x) => <ListPerson x={x} key={x.key} />);

const ListPerson = ({ x }) => (
  <React.Fragment>
    <span>
      {x.name || "unknown"}: Rp{x.value.toLocaleString("id-ID")}
    </span>
    <br />
  </React.Fragment>
);

const SubDR = ({ children, title }) => (
  <div>
    <p className="highlight">{title}</p>
    <div className="sub-result-div">
      <p id="priceTotal" className="result-text">
        {children}
      </p>
    </div>
  </div>
);

const PersonObj = ({ i, setValue }) => {
  const [personName, setPersonName] = React.useState("");
  const [personInput, setPersonInput] = React.useState("");
  const [personValue, setPersonValue] = React.useState(0);

  const sum = () => {
    setPersonValue(() => {
      const val = personInput
        .split(",")
        .reduce((t, v) => parseInt(t) + parseInt(v));
      return isNaN(val) ? alert("not a number") : val;
    });
  };

  React.useEffect(() => {
    if (personValue || personName) {
      setValue(i, personName, personValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personName, personValue]);

  return (
    <div className="person-div focus">
      <input
        id={"name_" + i}
        className="name-label"
        placeholder="nama"
        type="text"
        value={personName}
        onChange={(e) => setPersonName(e.target.value)}
      />
      <br />
      <input
        type="text"
        name="value"
        id={"value_" + i}
        placeholder="10, 25, 31, ..."
        value={personInput}
        onChange={(e) => setPersonInput(e.target.value)}
      />
      <Button btnName="submit" handleClick={sum} />
      <p>{personValue} kg</p>
    </div>
  );
};

const InputPerson = ({ personNumber, getPersonData }) => {
  const person = [personNumber];

  const setValue = (x, name, val) => {
    getPersonData(x, name, val);
  };

  for (let i = 0; i < personNumber; i++) {
    person[i] = <PersonObj key={i} i={i} setValue={setValue} />;
  }

  return person;
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
