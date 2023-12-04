"use client";
import React from 'react'
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Textarea,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useChara } from '../../_lib/utils';
import { useTranslations } from 'next-intl';

function Greetings() {
  const t = useTranslations();
  const {chara , setChara} = useChara();

  const handleAddGreetingsClick = () => {
    
    setChara(prev => ({
      ...prev,
      data: {
        ...prev.data,
        alternate_greetings: [
          ...prev.data.alternate_greetings,
          `New Greetings`  
        ]
      }
    }));
  };
  return (
    <div className="flex w-full flex-col">
      <Tabs variant='underlined'>
        {chara.data.alternate_greetings.map((item, index) => (
          <Tab 
            key={index} 
            title={`Greetings ${index + 1}`}
          >
            <Card>
              <CardBody>
              <div className="md:p-4 p-2 w-full flex flex-col gap-2">
                <Textarea
                  variant="underlined"
                  labelPlacement="outside"
                  placeholder="Description"
                  value={item}
                  maxRows={100}
                  onChange={e => {
                    setChara(prev => ({
                      ...prev,
                      data: {
                        ...prev.data, 
                        alternate_greetings: prev.data.alternate_greetings.map((greet, i) => 
                          i === index ? e.target.value : greet  
                        )
                      }
                    }))
                  }}
                />
              </div>
              </CardBody>
            </Card>
            <div className=" block p-4">
              <Popover placement="top" color='warning'>
                <PopoverTrigger>
                  <Button className="w-full" size="sm" color="danger">
                   {t('Greetings.deletegreetings')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <Popover placement="top" color='warning'>
                      <PopoverTrigger>
                        <Button size="sm" color="warning">
                          {t('Greetings.thisoperationcannotbewithdrawn')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Popover placement="top" color='danger'>
                          <PopoverTrigger>
                            <Button size="sm" color="warning">
                              {t('Previews.mymindismadeup')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                          <Button 
                            className="w-full" 
                            size="sm" 
                            color="danger"
                            onClick={() => {
                              setChara(prev => ({
                                ...prev,
                                data: {
                                  ...prev.data,
                                  alternate_greetings: prev.data.alternate_greetings.filter((_, i) => i !== index)  
                                }
                              }))
                            }}
                          >
                            Delete
                          </Button>
                          </PopoverContent>
                        </Popover>
                      </PopoverContent>
                    </Popover>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Tab>
        ))}
      </Tabs>
      <Button onClick={handleAddGreetingsClick} size="lg">
        {t('Previews.addgreetings')}
      </Button>
    </div>
  )
}

export default Greetings