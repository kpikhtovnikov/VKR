import s from "./emojees.module.scss";
import QueryBuilderOutlinedIcon from "@material-ui/icons/QueryBuilderOutlined";
import PetsIcon from "@material-ui/icons/PetsOutlined";
import EmojiFoodBeverageIcon from "@material-ui/icons/EmojiFoodBeverageOutlined";
import SportsSoccerIcon from "@material-ui/icons/SportsSoccerOutlined";
import DriveEtaIcon from "@material-ui/icons/DriveEtaOutlined";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import EmojiSymbolsOutlinedIcon from "@material-ui/icons/EmojiSymbolsOutlined";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";
import { emojiList } from "data/emojiSorted";
import { forwardRef, useEffect, useState } from "react";
import { emojiSearchList } from "data/emoje";

export const Emojees = forwardRef(
  ({ typing, setTyping, setInput }: any, ref: any) => {
    const [presentVisibleCat, setPresentVisibleCat] =
      useState("Emotions&People");
    const [query, setQuery] = useState<null | string>(null);

    const handleSearch = (query: string) => {
      if (query.length > 0) {
        setQuery(query);
      } else {
        setQuery(null);
      }
    };

    const handleScrollToCategory = (id: string) => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
    };

    const addEmoji = (emo: any) => {
      if (!typing) {
        setTyping(true);
      }
      setInput(ref.current.innerText + emo);
    };

    useEffect(() => {
      //@ts-ignore
      const drawerCats = [
        "Emotions&People",
        "Nature",
        "Food",
        "Activity",
        "Travel&Places",
        "Objects",
        "Flags",
        "Symbols",
      ];
      const intersectionOptions = {
        root: null,
      };
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPresentVisibleCat(entry.target.id);
          }
        });
      }, intersectionOptions);

      drawerCats.forEach((id) => {
        const refSection = document.getElementById(id);
        //@ts-ignore
        observer.observe(refSection);
      });
    }, []);

    return (
      <div className={s.emojiContainer}>
        <div className={s.category}>
          {/* <span
            className={presentVisibleCat === "RecentEmojees" ? s.activeSvg : ""}
            onClick={() => handleScrollToCategory("RecentEmojees")}
          >
            <QueryBuilderOutlinedIcon />
          </span> */}
          <span
            className={
              presentVisibleCat === "Emotions&People" ? s.activeSvg : ""
            }
            onClick={() => handleScrollToCategory("Emotions&People")}
          >
            <SentimentSatisfiedOutlinedIcon />
          </span>
          <span
            className={
              presentVisibleCat === "Nature" ? s.activeSvg : ""
            }
            onClick={() => handleScrollToCategory("Nature")}
          >
            <PetsIcon />
          </span>
          <span
            className={presentVisibleCat === "Food" ? s.activeSvg : ""}
            onClick={() => handleScrollToCategory("Food")}
          >
            <EmojiFoodBeverageIcon />
          </span>
          <span
            className={presentVisibleCat === "Activity" ? s.activeSvg : ""}
            onClick={() => handleScrollToCategory("Activity")}
          >
            <SportsSoccerIcon />
          </span>
          <span
            className={presentVisibleCat === "Travel&Places" ? s.activeSvg : ""}
            onClick={() => handleScrollToCategory("Travel&Places")}
          >
            <DriveEtaIcon />
          </span>
          <span
            className={presentVisibleCat === "Objects" ? s.activeSvg : ""}
            onClick={() => handleScrollToCategory("Objects")}
          >
            <EmojiObjectsOutlinedIcon />
          </span>
          <span
            className={presentVisibleCat === "Flags" ? s.activeSvg : ""}
            onClick={() => handleScrollToCategory("Flags")}
          >
            <PublicOutlinedIcon />
          </span>
          <span
            className={presentVisibleCat === "Symbols" ? s.activeSvg : ""}
            onClick={() => handleScrollToCategory("Symbols")}
          >
            <EmojiSymbolsOutlinedIcon />
          </span>
        </div>

        <div className={s.search}>
          <input
            onChange={(e: any) => handleSearch(e.target.value)}
            placeholder="Поиск на английском языке"
          />
        </div>
        <div id="drawerEmo" className={s.emojeesMain}>
          {/* {!query ? (
          <div className={s.classWiseEmojees}>
            <a id="RecentEmojees">Recents</a>
            <div className={s.emos}>
              <p>😃</p>
              <p>😄</p>
              <p>😅</p>
              {e.data.map((e) => {
              return <p dangerouslySetInnerHTML={{ __html: e.code_decimal }} />;
            })}
            </div>
          </div>
        ) : null} */}
          {query ? (
            <div className={s.classWiseEmojees}>
              <div className={`${s.emos} ${s.queryEmos}`}>
                {emojiSearchList
                  ?.filter((e: any) => {
                    return e.name.includes(query);
                  })
                  .map((e) => (
                    <p
                      onClick={() => addEmoji(e.code_decimal)}
                      dangerouslySetInnerHTML={{
                        __html: e.code_decimal,
                      }}
                    />
                  ))}
              </div>
            </div>
          ) : (
            emojiList.map((e) => {
              return (
                <div className={s.classWiseEmojees}>
                  <a id={e.title.toString().replaceAll(" ", "")}>{e.title}</a>
                  {/* @ts-ignore */}
                  <div className={s.emos}>
                    {e.data.map((e) => {
                      return (
                        <p
                          onClick={() => addEmoji(e.code_decimal)}
                          dangerouslySetInnerHTML={{
                            __html: e.code_decimal,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
);
