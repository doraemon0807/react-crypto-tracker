import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

export const URL =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";

const router = createBrowserRouter([
  {
    path: `${URL}`,
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
