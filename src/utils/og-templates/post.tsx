import type { CollectionEntry } from "astro:content";

export default (post: CollectionEntry<"blog">) => {
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
          padding: "0 0 0 20px",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
          display: "flex",
          flexDirection: "column",
          fontSize: "1.75em",
          fontFamily: '"Roboto Mono", monospace',
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
          $ head -n 1 "{post.data.title}"
        </p>
        <p
          style={{
            textAlign: "left",
            color: "#cdee69",
            paddingLeft: "5px",
            marginTop: "0",
          }}
        >
          {post.data.description}
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
