import { useIterator } from "../Hooks/useIterator";

const IteratorTest = () => {
  const [users, currentUser, loading, next, previous] = useIterator(
    "https://randomuser.me/api/"
  );

  return (
    <div>
      <h2>Users List:</h2>

      {users.length > 0 &&
        currentUser &&
        users.map((data) => (
          <div
            key={data.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              color: data.id === currentUser.id ? "#007c16" : "#000",
              fontWeight: data.id === currentUser.id ? "bold" : "normal",
            }}
          >
            <img src={data.picture} alt="thumbnail" />
            <span style={{ marginLeft: "10px" }}>{data.name}</span>
          </div>
        ))}

      <div style={{ marginTop: "20px" }}>
        <button type="button" onClick={previous}>
          Previous
        </button>
        <button type="button" onClick={next}>
          {loading ? "Loading" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default IteratorTest;
