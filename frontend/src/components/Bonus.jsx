import { useState, useEffect } from "react";

function Bonus() {
  const [bonusCounts, setBonusCounts] = useState(
    JSON.parse(localStorage.getItem("bonusCounts")) || [0, 0]
  );

  const incrementCount = (index) => {
    const updatedCounts = [...bonusCounts];
    if (updatedCounts[index] < 5) {
      updatedCounts[index] += 1;
      setBonusCounts(updatedCounts);
    }
  };

  const decrementCount = (index) => {
    const updatedCounts = [...bonusCounts];
    if (updatedCounts[index] > 0) {
      updatedCounts[index] -= 1;
      setBonusCounts(updatedCounts);
    }
  };
  useEffect(() => {
    localStorage.setItem("bonusCounts", JSON.stringify(bonusCounts));
  }, [bonusCounts]);
  return (
    <div className="Container-Bonus">
      <div className="Container-Bonus">
        <ul>
          <li>
            <div>
              <h3>Bonus 1</h3>
              <p>Ralenti le temps</p>
            </div>
            <div>
              <button type="button" onClick={() => incrementCount(0)}>
                +
              </button>
              <button type="button" onClick={() => decrementCount(0)}>
                -
              </button>
              <span>{bonusCounts[0]}</span>
            </div>
          </li>
          <li>
            <div>
              <h3>Bonus 2</h3>
              <p>Enlève deux questions</p>
            </div>
            <div>
              <button type="button" onClick={() => incrementCount(1)}>
                +
              </button>
              <button type="button" onClick={() => decrementCount(1)}>
                -
              </button>
              <span>{bonusCounts[1]}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Bonus;
