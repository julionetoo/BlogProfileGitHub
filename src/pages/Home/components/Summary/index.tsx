import { api } from "../../../../lib/api";
import { SummaryAnchors, SummaryContainer, SummaryHeader } from "./styles";
import { useEffect, useState } from "react";
import { ArrowUpRight, Buildings, GithubLogo, Users } from "phosphor-react";

interface DadosPerfil {
  avatar_url: string;
  name: string;
  bio: string;
  login: string;
  html_url: string;
  company?: string;
  followers: number;
};


export function Summary() {

  const [userData, setUserData] = useState<DadosPerfil | null>(null);

  useEffect(() => {

    api
      .get("users/lucaspedronet")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do GitHub:", error);
      });

  }, []);

  if (!userData) {
    return <p>Carregando...</p>;
  }


  return (
    <SummaryContainer>
      <img src={userData.avatar_url} />
      <section>
        <SummaryHeader>
          <h1>{userData.name}</h1>
          <a href={userData.html_url} target="_blank">
            GITHUB
            <ArrowUpRight size={12} />
          </a>
        </SummaryHeader>
        <p>{userData.bio}</p>
        <SummaryAnchors>
          <div>
            <GithubLogo size={18} />
            <span>{userData.login}</span>
          </div>

          <div>
            <Buildings size={18} />
            <span>{userData.company}</span>
          </div>

          <div>
            <Users size={18} />
            <span>{userData.followers}</span>
          </div>
        </SummaryAnchors>
      </section>
    </SummaryContainer>
  );
}
