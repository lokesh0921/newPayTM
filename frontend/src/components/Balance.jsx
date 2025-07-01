// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// export const Balance = () => {
//   const [balance, setBalance] = useState("");
//   const location = useLocation();

//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:5001/api/v1/account/balance", {
//   //       headers: {
//   //         Authorization: "Bearer " + localStorage.getItem("token"),
//   //       },
//   //     })
//   //     .then((response) => {
//   //       setBalance(response.data.balance);
//   //     });
//   // }, [location]);
//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/api/v1/account/balance", {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       })
//       .then((response) => {
//         setBalance(response.data.balance);
//       })
//       .catch((error) => {
//         console.error("Error fetching balance:", error);
//       });
//   }, [location.pathname]); // Triggers on pathname changes
//   return (
//     <div className="flex">
//       <div className="font-bold text-lg">Your balance</div>
//       <div className="font-semibold ml-4 text-lg">
//         Rs {Math.floor(Number(balance))}
//       </div>
//     </div>
//   );
// };

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Balance = () => {
  const [balance, setBalance] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Only fetch balance if we're on the dashboard route
    if (location.pathname === "/dashboard") {
      axios
        .get("http://localhost:5001/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setBalance(response.data.balance);
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
    }
  }, [location]); // Add location as dependency

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance : </div>
      <div className="font-semibold ml-1 text-lg">
        Rs {Math.floor(Number(balance))}
      </div>
    </div>
  );
};
