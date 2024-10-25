export default () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "50px",
      }}
    >
      <div
        style={{
          width: "100%",
          boxSizing: "border-box",
          height: "25px",
          backgroundColor: "#bbb",
          margin: "0 auto",
          borderTopRightRadius: "5px",
          borderTopLeftRadius: "5px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: "6px",
        }}
      >
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            border: "1px solid #000",
            backgroundColor: "#ff3b47",
            borderColor: "#9d252b",
            marginRight: "5px",
          }}
        ></div>
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            border: "1px solid #000",
            backgroundColor: "#ffc100",
            borderColor: "#9d802c",
            marginRight: "5px",
          }}
        ></div>
        <div
          style={{
            height: "10px",
            width: "10px",
            borderRadius: "50%",
            border: "1px solid #000",
            backgroundColor: "#00d742",
            borderColor: "#049931",
          }}
        ></div>
      </div>
      <div
        style={{
          backgroundColor: "#151515",
          boxSizing: "border-box",
          width: "1100px",
          height: "505px",
          margin: "0 auto",
          padding: "0 20px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          display: "flex",
          flexDirection: "column",
          fontSize: "1.75em",
          fontFamily: '"JetBrains Mono", monospace',
          fontWeight: "600",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <p
          style={{
            textAlign: "left",
            color: "#9cd9f0",
          }}
        >
          $ whoami
        </p>
        <p
          style={{
            textAlign: "left",
            color: "#cdee69",
            paddingLeft: "5px",
            marginTop: "0",
          }}
        >
          Hey I'm Cyprien
          <svg
            style={{ marginLeft: "5px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path
              fill="#EF9645"
              d="M4.861 9.147c.94-.657 2.357-.531 3.201.166l-.968-1.407c-.779-1.111-.5-2.313.612-3.093 1.112-.777 4.263 1.312 4.263 1.312-.786-1.122-.639-2.544.483-3.331 1.122-.784 2.67-.513 3.456.611l10.42 14.72L25 31l-11.083-4.042L4.25 12.625c-.793-1.129-.519-2.686.611-3.478z"
            />
            <path
              fill="#FFDC5D"
              d="M2.695 17.336s-1.132-1.65.519-2.781c1.649-1.131 2.78.518 2.78.518l5.251 7.658c.181-.302.379-.6.6-.894L4.557 11.21s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l6.855 9.997c.255-.208.516-.417.785-.622L7.549 6.732s-1.131-1.649.519-2.78c1.649-1.131 2.78.518 2.78.518l7.947 11.589c.292-.179.581-.334.871-.498L12.238 4.729s-1.131-1.649.518-2.78c1.649-1.131 2.78.518 2.78.518l7.854 11.454 1.194 1.742c-4.948 3.394-5.419 9.779-2.592 13.902.565.825 1.39.26 1.39.26-3.393-4.949-2.357-10.51 2.592-13.903L24.515 8.62s-.545-1.924 1.378-2.47c1.924-.545 2.47 1.379 2.47 1.379l1.685 5.004c.668 1.984 1.379 3.961 2.32 5.831 2.657 5.28 1.07 11.842-3.94 15.279-5.465 3.747-12.936 2.354-16.684-3.11L2.695 17.336z"
            />
            <g fill="#5DADEC">
              <path d="M12 32.042C8 32.042 3.958 28 3.958 24c0-.553-.405-1-.958-1s-1.042.447-1.042 1C1.958 30 6 34.042 12 34.042c.553 0 1-.489 1-1.042s-.447-.958-1-.958z" />
              <path d="M7 34c-3 0-5-2-5-5 0-.553-.447-1-1-1s-1 .447-1 1c0 4 3 7 7 7 .553 0 1-.447 1-1s-.447-1-1-1zM24 2c-.552 0-1 .448-1 1s.448 1 1 1c4 0 8 3.589 8 8 0 .552.448 1 1 1s1-.448 1-1c0-5.514-4-10-10-10z" />
              <path d="M29 .042c-.552 0-1 .406-1 .958s.448 1.042 1 1.042c3 0 4.958 2.225 4.958 4.958 0 .552.489 1 1.042 1s.958-.448.958-1C35.958 3.163 33 .042 29 .042z" />
            </g>
          </svg>
        </p>
        <p
          style={{
            textAlign: "left",
            color: "#cdee69",
            paddingLeft: "5px",
            marginTop: "0",
          }}
        >
          I'm a software engineer living in Montpellier, France{" "}
          <svg
            style={{ marginLeft: "5px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 36 36"
          >
            <path
              fill="#ED2939"
              d="M36 27c0 2.209-1.791 4-4 4h-8V5h8c2.209 0 4 1.791 4 4v18z"
            />
            <path
              fill="#002495"
              d="M4 5C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h8V5H4z"
            />
            <path fill="#EEE" d="M12 5h12v26H12z" />
          </svg>
        </p>
        <p
          style={{
            textAlign: "left",
            color: "#cdee69",
            paddingLeft: "5px",
            marginTop: "0",
          }}
        >
          Here is my personal corner of the web where I post mostly on technical
          subject.
        </p>
        <p
          style={{
            textAlign: "left",
            color: "#9cd9f0",
          }}
        >
          $
          <span
            style={{
              marginLeft: "20px",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            _
          </span>
        </p>
      </div>
    </div>
  );
};
