'use client'
import React from "react";
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import InforMation from "./InforMation";
import Description from "./Description";
import First_Message from "./First_Message";
import Prompt_Overrides from "./Prompt_Overrides";
import { useTranslations } from "next-intl";
import Mes_Example from "./Mes_Example";

export default function Character() {
  const t = useTranslations();
  return (
      <Tabs aria-label="Options" >
        <Tab key="inforMation" title={t('Character.information')}>
          <Card>
            <CardBody>
              <InforMation/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="description" title={t('Character.description')}>
          <Card>
            <CardBody>
              <Description/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="first_mes" title={t('Character.firstmessage')}>
          <Card>
            <CardBody>
              <First_Message/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="prompt_overrides" title={t('Character.promptoverrdies')}>
          <Card>
            <CardBody>
              <Prompt_Overrides/>
            </CardBody>
          </Card>  
        </Tab>
        <Tab key="mes_example" title={t('Character.mesexample')}>
          <Card>
            <CardBody>
              <Mes_Example/>
            </CardBody>
          </Card>  
        </Tab>
      </Tabs>
  );
}
