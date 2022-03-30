import s from "./sidebarHeadStyles.module.scss";
import { connect } from "react-redux";
import { setDropDown } from "redux/reducers/dropDown";
import { setSidebarModal } from "redux/reducers/sidebarChatModal";
import { SidebarSearch } from "../SidebarSearch/SidebarSearch";
import { searchType } from "constants/searchText";


const passDispatchToProps = (dispatch: any) => ({
  setPersonalSettingsDropdown: (dropDown: any) =>
    dispatch(setDropDown(dropDown)),
  setSidebarModal: (sidebarModal: any) =>
    dispatch(setSidebarModal(sidebarModal)),
  // setAuthUser: (auth: any) => dispatch(setAuthState(auth)),
});

const passStateToProps = ({ dropDownMenu, authState }: any) => ({
  dropDown: dropDownMenu.dropDown,
  authState: authState.auth,
});

export const SidebarHead = connect(
  passStateToProps,
  passDispatchToProps
)(
  ({
    authState,
    dropDown,
    setPersonalSettingsDropdown,
    setSidebarModal,
  }: any) => {

    // const toggleDropdown = (e: any) => {
    //   if (dropDown.type === "personalSetting") {
    //     setPersonalSettingsDropdown({
    //       type: "",
    //     });
    //   } else {
    //     setPersonalSettingsDropdown({
    //       type: "personalSetting",
    //       position: {
    //         // x: e.target.getBoundingClientRect().left - 110,
    //         // y: e.target.getBoundingClientRect().top + 34,
    //         x: e.target.getBoundingClientRect().left + 10,
    //         y: e.target.getBoundingClientRect().top + 35,
    //       },
    //       params: {},
    //     });
    //   }
    // };

    const toggleDropdown = (e: any) => {
      if (dropDown.type === "addChat") {
        setPersonalSettingsDropdown({
          type: "",
        });
      } else {
        setPersonalSettingsDropdown({
          type: "addChat",
          position: {
            x: e.target.getBoundingClientRect().left + 10,
            y: e.target.getBoundingClientRect().top + 26,
          },
          params: {},
        });
      };
    };

    return (
      <div className={s.sidebarHead}>
        <span
          onClick={() => {
            setSidebarModal({
              type: "userSidebar",
              params: {
                headerTitle: "Мой профиль",
              },
            });
          }}
          className={s.avatar}
        >
          {authState.avatar ? (
            <img src={authState.avatar} alt="" />
          ) : (
            <div className={s.mainIcon}>
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
              </svg>
            </div>
          )}
        </span>
        <SidebarSearch typeSearch={searchType.chatSearch}/>
        <div className={s.headControls}>
          <span
            onClick={toggleDropdown}
            className="icons"
            title ="Создать чат"
          >
            <svg
              viewBox="0 0 30 30"
              width="35"
              height="35"
              className={s.avatar}
            >
              <path
                fill="currentColor"
                d="M15.313 15.672c2.401 0 4.237-1.835 4.237-4.235S17.713 7.2 15.313 7.2s-4.235 1.836-4.235 4.237 1.834 4.235 4.235 4.235zm9.349-.64c1.571 0 2.773-1.201 2.773-2.772 0-1.571-1.202-2.773-2.773-2.773s-2.772 1.202-2.772 2.773c0 1.571 1.201 2.772 2.772 2.772zm-1.724 5.841a7.856 7.856 0 0 0-.889-1.107 8.074 8.074 0 0 0-1.825-1.413 9.05 9.05 0 0 0-.675-.346l-.021-.009c-1.107-.502-2.5-.851-4.232-.851-1.732 0-3.124.349-4.232.851l-.112.054a9.247 9.247 0 0 0-.705.374 8.137 8.137 0 0 0-1.705 1.341 7.991 7.991 0 0 0-.656.773 8.584 8.584 0 0 0-.233.334c-.063.095-.116.184-.164.263l-.012.02a4.495 4.495 0 0 0-.213.408v2.276h16.061v-2.276s-.07-.164-.225-.427a4.257 4.257 0 0 0-.162-.265zm1.724-4.357c-1.333 0-2.376.3-3.179.713a9.409 9.409 0 0 1 1.733 1.218c1.402 1.25 1.959 2.503 2.017 2.641l.021.049h4.954v-1.571s-1.294-3.05-5.546-3.05zM9.41 13.78H6.261v-3.152H4.344v3.152H1.2v1.918h3.144v3.145h1.917v-3.145H9.41V13.78z"
              ></path>
            </svg>
          </span>
        </div>
      </div>
    );
  }
);
