import { Helmet } from "react-helmet";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Title = styled.h1`
  font-size: 32px;
  color: ${(props) => props.theme.accentColor};
`;

const Return = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  a {
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Loader = styled.span`
  text-align: center;
  display: block;
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface TickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Overview = styled.div`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 35px;
`;

const InfoHeader = styled.span`
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
`;

const InfoSpan = styled.span``;

const Description = styled.p`
  margin-bottom: 20px;
`;

const Tabs = styled(Overview)`
  margin-top: 40px;
  padding: 0;
  overflow: hidden;
`;

const Tab = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;
  font-weight: 400;
  text-transform: uppercase;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: flex;
    padding: 10px;
    justify-content: space-around;
  }
`;

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation();
  const priceMatch = useMatch(`${process.env.PUBLIC_URL}/:coinId/price`);
  const chartMatch = useMatch(`${process.env.PUBLIC_URL}/:coinId/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(`${coinId}`)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<TickersData>(
      ["tickers", coinId],
      () => fetchCoinTickers(`${coinId}`),
      {
        refetchInterval: 5000,
      }
    );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state
            ? `${state.name} (${state.symbol})`
            : loading
            ? "Loading..."
            : `${infoData?.name} (${infoData?.symbol})`}
        </title>
      </Helmet>
      <Header>
        <Return>
          <Link to={`${process.env.PUBLIC_URL}`}>&larr; Home</Link>
        </Return>
        <Title>
          {state
            ? `${state.name} (${state.symbol})`
            : loading
            ? "Loading..."
            : `${infoData?.name} (${infoData?.symbol})`}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <InfoDiv>
              <InfoHeader>Rank:</InfoHeader>
              <InfoSpan>{infoData?.rank || "N/A"}</InfoSpan>
            </InfoDiv>
            <InfoDiv>
              <InfoHeader>Symbol:</InfoHeader>
              <InfoSpan>{`$${infoData?.symbol}` || "N/A"}</InfoSpan>
            </InfoDiv>
            <InfoDiv>
              <InfoHeader>Price:</InfoHeader>
              <InfoSpan>
                ${tickersData?.quotes.USD.price.toFixed(2) || "N/A"}
              </InfoSpan>
            </InfoDiv>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <InfoDiv>
              <InfoHeader>Total Supply:</InfoHeader>
              <InfoSpan>{tickersData?.total_supply || "N/A"}</InfoSpan>
            </InfoDiv>
            <InfoDiv>
              <InfoHeader>Max Supply:</InfoHeader>
              <InfoSpan>{tickersData?.max_supply || "N/A"}</InfoSpan>
            </InfoDiv>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
          </Tabs>

          <Outlet context={coinId} />
        </>
      )}
    </Container>
  );
}

export default Coin;
