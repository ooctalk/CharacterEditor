"use client";
import React, { useRef } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Textarea,
  Input,
  RadioGroup,
  Radio,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useCharacterBook } from "../../_lib/utils";
import { useTranslations } from "next-intl";

export default function WorldBook() {
  const t = useTranslations();
  const { character_book, setCharacter_Book } = useCharacterBook();

  const handleDeleteButtonClick = (id: any) => {
    // Implement the logic to delete the entry with the given id
    setCharacter_Book((prevChara) => {
      const updatedEntries = (prevChara.entries || []).filter(
        (entry) => entry.id !== id
      );

      // Update ids and display_index in sequential order
      const updatedEntriesWithIds = updatedEntries.map((entry, index) => ({
        ...entry,
        id: index + 1,
        extensions: {
          ...entry.extensions,
          display_index: index + 1,
        },
      }));

      return {
        ...prevChara,
        entries: updatedEntriesWithIds,
      };
    });
  };

  const handleAddNewBookClick = () => {
    // Determine the next available id and display_index based on existing entries
    const nextId = (character_book.entries || []).length + 1;
    const nextDisplayIndex = nextId;

    // Default template for new entries
    const defaultTemplate = {
      id: nextId,
      keys: [],
      secondary_keys: [],
      comment: "New Book",
      content: "",
      constant: true,
      selective: true,
      insertion_order: 100,
      enabled: true,
      position: "after_char",
      extensions: {
        position: 3,
        exclude_recursion: false,
        display_index: nextDisplayIndex,
        probability: 100,
        useProbability: true,
        depth: 4,
      },
    };

    setCharacter_Book((prevChara) => ({
      ...prevChara,
      entries: [...(prevChara.entries || []), defaultTemplate],
    }));
  };

  return (
    <>
      <Tabs
        aria-label="Dynamic tabs"
        variant="light"
        items={character_book.entries}
      >
        {(item) => (
          <Tab key={item.id} title={item.comment || t('WorldBook.untitledbook')}>
            <Card>
              <CardBody>
                <div className="md:p-4 p-2 w-full flex flex-col gap-2">
                  <div>
                    <label className="block text-sm font-medium leading-6">
                      {t('WorldBook.content')}
                    </label>
                    <Textarea
                      value={item.content}
                      onChange={(e) =>
                        setCharacter_Book((prevChara) => ({
                          ...prevChara,
                          entries: (prevChara.entries || []).map((entry) =>
                            entry.id === item.id
                              ? { ...entry, content: e.target.value }
                              : entry
                          ),
                        }))
                      }
                      variant="underlined"
                      labelPlacement="outside"
                      maxRows={100}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6">
                      {t('WorldBook.titlememo')}
                    </label>
                    <Input
                      color="warning"
                      size="sm"
                      autoComplete="off"
                      value={item.comment}
                      onChange={(e) =>
                        setCharacter_Book((prevChara) => ({
                          ...prevChara,
                          entries: (prevChara.entries || []).map((entry) =>
                            entry.id === item.id
                              ? { ...entry, comment: e.target.value }
                              : entry
                          ),
                        }))
                      }
                      maxLength={64}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6">
                      {t('WorldBook.primarykeywords')}
                    </label>
                    <Input
                      size="sm"
                      autoComplete="off"
                      value={item.keys}
                      onChange={(e) =>
                        setCharacter_Book((prevChara) => ({
                          ...prevChara,
                          entries: (prevChara.entries || []).map((entry) =>
                            entry.id === item.id
                              ? { ...entry, keys: e.target.value }
                              : entry
                          ),
                        }))
                      }
                      maxLength={64}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium leading-6">
                      {t('WorldBook.optionalfilter')}
                    </label>
                    <Input
                      size="sm"
                      autoComplete="off"
                      value={item.secondary_keys}
                      onChange={(e) =>
                        setCharacter_Book((prevChara) => ({
                          ...prevChara,
                          entries: (prevChara.entries || []).map((entry) =>
                            entry.id === item.id
                              ? { ...entry, secondary_keys: e.target.value }
                              : entry
                          ),
                        }))
                      }
                      maxLength={64}
                      type="text"
                    />
                  </div>
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium leading-6">
                      {t('WorldBook.orfer')}
                    </label>
                    <Input
                      color="primary"
                      size="sm"
                      autoComplete="off"
                      value={item.insertion_order}
                      onChange={(e) =>
                        setCharacter_Book((prevChara) => ({
                          ...prevChara,
                          entries: (prevChara.entries || []).map((entry) =>
                            entry.id === item.id
                              ? { ...entry, insertion_order: e.target.value }
                              : entry
                          ),
                        }))
                      }
                      type="number"
                      max={1000}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div className="max-w-xs">
                    <label className="block text-sm font-medium leading-6">
                      {t('WorldBook.depth')}
                    </label>
                    <Input
                      size="sm"
                      autoComplete="off"
                      value={item.extensions.depth}
                      onChange={(e) =>
                        setCharacter_Book((prevChara) => ({
                          ...prevChara,
                          entries: (prevChara.entries || []).map((entry) =>
                            entry.id === item.id
                              ? { ...entry, extensions: { ...entry.extensions, depth: e.target.value } }
                              : entry
                          ),
                        }))
                      }
                      type="number"
                      max={4}
                      min={0}
                      step={1}
                    />
                  </div>
                  <div>
                  <RadioGroup
                    color="warning"
                    label={t('WorldBook.position')}
                    orientation="horizontal"
                    value={String(item.extensions.position)}
                    onChange={(e) =>
                      setCharacter_Book((prevChara) => ({
                        ...prevChara,
                        entries: (prevChara.entries || []).map((entry) =>
                          entry.id === item.id
                            ? { ...entry, extensions: { ...entry.extensions, position: Number(e.target.value)  } }
                            : entry
                        ),
                      }))
                    }
                  >
                    <Radio value="0">{t('WorldBook.beforechar')}</Radio>
                    <Radio value="1">{t('WorldBook.afterchar')}</Radio>
                    <Radio value="2">{t('WorldBook.berforean')}</Radio>
                    <Radio value="3">{t('WorldBook.afteran')}</Radio>
                    <Radio value="4">{t('WorldBook.D')}</Radio>
                  </RadioGroup>


                  </div>
                  <div>
                  <RadioGroup
                    color="secondary"
                    label={t('WorldBook.status')}
                    orientation="horizontal"
                    value={String(item.constant)}
                    onChange={(e) =>
                      setCharacter_Book((prevChara) => ({
                        ...prevChara,
                        entries: (prevChara.entries || []).map((entry) =>
                          entry.id === item.id
                            ? { ...entry, constant: Boolean(e.target.value === 'true') }
                            : entry
                        ),
                      }))
                    }
                  >
                    <Radio value="false">{t('WorldBook.normal')}</Radio>
                    <Radio value="true">{t('WorldBook.constan')}</Radio>
                  </RadioGroup>

                  </div>
                </div>
              </CardBody>
            </Card>
            <div className=" block p-4">
              <Popover placement="top" color="warning">
                <PopoverTrigger>
                  <Button className="w-full" size="sm" color="danger">
                   {t('WorldBook.deletebook')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <Popover placement="top" color="warning">
                      <PopoverTrigger>
                        <Button size="sm" color="warning">
                          {t('Greetings.thisoperationcannotbewithdrawn')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Popover placement="top" color="danger">
                          <PopoverTrigger>
                            <Button size="sm" color="warning">
                              {t('Previews.mymindismadeup')}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Button
                              onClick={() => handleDeleteButtonClick(item.id)}
                              size="sm"
                              color="danger"
                            >
                              {t('WorldBook.delete')}
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
        )}
      </Tabs>
      <Button onClick={handleAddNewBookClick} size="lg">
        {t('WorldBook.addnewbook')}
      </Button>
    </>
  );
}
