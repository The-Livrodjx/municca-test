import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export default function Home() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: async () => await (await api.get('/users')).data,
  });

  if (isPending || isFetching) return (<>Carregando...</>);

  if (error) return (<>Erro ao Buscar dados</>);

  if (!data) return (<>Nenhum Usuário encontrado</>);

  return (
    <>
      { data.map(user => user.name) }
    </>
  );
}