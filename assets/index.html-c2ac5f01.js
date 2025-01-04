import{_ as i,r as t,o as e,c as s,d as c,w as o,b as m,t as n,a as l}from"./app-01e1299e.js";const r={},d=l("p",null,"工作流选择",-1),b=l("ol",null,[l("li",null,"OsWorkFlow —— 轻量级选择"),l("li",null,"JBPM —— JBoss"),l("li",null,"Activiti —— JBPM发展过来的"),l("li",null,"Flowable")],-1);function u(B,J){const a=t("mermaid");return e(),s("div",null,[d,b,c(a,null,{default:o(()=>[m(n(`
flowchart LR
  classDef JBPM fill:#e66,color:#fff
  classDef Activiti fill:#66e,color:#fff
  classDef Flowable fill:#3a3
  classDef Camunda fill:#e33
  JBPM4["JBPM4<br><small>2009</small>"]:::JBPM
  JBPM5["JBPM5<br><small>2010</small>"]:::JBPM
  JBPM6["JBPM6<br><small>2016</small>"]:::JBPM
  JBPM7["JBPM7<br><small>2020</small>"]:::JBPM
  Activiti5["Activiti5<br><small>2010</small>"]:::Activiti
  Activiti6["Activiti6<br><small>2015</small>"]:::Activiti
  Activiti7["Activiti7<br><small>2020</small>"]:::Activiti
  Flowable6["Flowable6<br><small>2016</small>"]:::Flowable
  Flowable6.5.x["Flowable6.5.x<br><small>2020</small>"]:::Flowable
  Camunda7["Camunda7<br><small>2013</small>"]:::Camunda
  Camunda7.14.x["Camunda7.14.x<br><small>2020</small>"]:::Camunda
  subgraph 2010
    JBPM5
    Activiti5
  end
  subgraph 2015
    JBPM6
    Activiti6
    Flowable6
    Camunda7
  end
  subgraph 2020
    JBPM7
    Activiti7
    Flowable6.5.x
    Camunda7.14.x
  end
  JBPM4 --> JBPM5 --> JBPM6 --> JBPM7
  JBPM4 --> Activiti5 --> Activiti6 --> Activiti7
  Activiti6 --> Flowable6 --> Flowable6.5.x
  Activiti5 --> Camunda7 --> Camunda7.14.x
`),1)]),_:1})])}const M=i(r,[["render",u],["__file","index.html.vue"]]);export{M as default};