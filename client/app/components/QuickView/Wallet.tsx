"use client";

import React, { useEffect, useState } from "react";
import Card from "../../dashboard/Card";
import { MdMoreVert } from "react-icons/md";

const Wallet = () => {
  const [fullWallet, setFullWallet] = useState(false);
  const [listener, setListener] = useState(true);

  const [selectedCard, setSelectedCard] = useState({
    id: "1",
    background: "cardBackground1",
    balance: "12,202",
  });

  const [cards, setCards] = useState([
    {
      id: "1",
      background: "cardBackground1",
      balance: "12,202",
    },
    {
      id: "2",
      background: "cardBackground2",
      balance: "8,122",
    },
    {
      id: "3",

      background: "cardBackground3",
      balance: "21,765",
    },
  ]);

  const showWallet = () => {
    let cards = document.getElementsByClassName(
      "cardWrapper"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("selectCard");
    }
    const cardContainer = document.getElementById(
      "cardContainer"
    ) as HTMLDivElement;
    cardContainer.classList.add("expanded");
  };

  const hideWallet = () => {
    let cards = document.getElementsByClassName(
      "cardWrapper"
    ) as HTMLCollectionOf<HTMLElement>;

    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add("selectCard");
    }
    const cardContainer = document.getElementById(
      "cardContainer"
    ) as HTMLDivElement;
    cardContainer.classList.remove("expanded");
  };

  useEffect(() => {
    const cardContainer = document.getElementById(
      "cardContainer"
    ) as HTMLDivElement;

    if (listener) {
      cardContainer.addEventListener("mouseover", showWallet);
      cardContainer.addEventListener("mouseout", hideWallet);
      return () => {
        cardContainer.removeEventListener("mouseover", showWallet);
        cardContainer.removeEventListener("mouseout", hideWallet);
      };
    } else {
      cardContainer.removeEventListener("mouseover", showWallet);
      cardContainer.removeEventListener("mouseout", hideWallet);
    }
  }, [listener]);

  const resetHover = () => {
    setListener(true);
  };

  return (
    <div className="z-[100] h-fit relative">
      <div className="flex flex-row justify-between items-center w-[90%] mb-3">
        <h1 className="text-xl xl:text-2xl text-c11 whitespace-nowrap ">
          My Wallet
        </h1>
        <button
          onClick={showWallet}
          className="xl:text-[12px] text-[10px] text-c12 whitespace-nowrap "
        >
          View All
        </button>
      </div>

      <div id="cardContainer" className="cursor-pointer  relative  z-[80]">
        <div className="cardWrapper relative z-[30] w-fit  rounded-[15px] h-fit selectCard ">
          <Card background={selectedCard.background} />
        </div>

        {cards.map((card, i) => {
          if (card.id !== selectedCard.id) {
            return (
              <div
                key={i}
                onClick={() => {
                  setSelectedCard(card);
                  setListener(false);
                  let cards = document.getElementsByClassName(
                    "cardWrapper"
                  ) as HTMLCollectionOf<HTMLElement>;

                  for (let i = 0; i < cards.length; i++) {
                    cards[i].classList.add("selectCard");
                  }
                  const cardContainer = document.getElementById(
                    "cardContainer"
                  ) as HTMLDivElement;
                  cardContainer.removeEventListener("mouseover", showWallet);
                  cardContainer.classList.remove("expanded");

                  setTimeout(resetHover, 700);
                }}
                className="cardWrapper overflow-hidden cursor-pointer relative z-[80] xl:rounded-[15px] rounded-md  w-fit h-fit selectCard"
              >
                <div className="cardHover hidden absolute text-sm w-full h-full bg-[rgba(0,0,0,.6)] text-c11 flex items-center z-[90] ">
                  <div className="bg-c9 p-2 rounded-md whitespace-nowrap text-sm xl:text-base w-fit mx-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Select Card
                  </div>
                </div>
                <Card background={card.background} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Wallet;
