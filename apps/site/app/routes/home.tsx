import { useEffect } from "react";
import { useNavigate } from "react-router";


export default function Home({ loaderData }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/products");
  }, []);
  return <div>Hola</div>;
}
