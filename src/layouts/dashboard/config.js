import { Chip, SvgIcon } from "@mui/material";
import AlignLeft02Icon from "../../icons/untitled-ui/duocolor/align-left-02";
import BarChartSquare02Icon from "../../icons/untitled-ui/duocolor/bar-chart-square-02";
import Building04Icon from "../../icons/untitled-ui/duocolor/building-04";
import CalendarIcon from "../../icons/untitled-ui/duocolor/calendar";
import CheckDone01Icon from "../../icons/untitled-ui/duocolor/check-done-01";
import CreditCard01Icon from "../../icons/untitled-ui/duocolor/credit-card-01";
import CurrencyBitcoinCircleIcon from "../../icons/untitled-ui/duocolor/currency-bitcoin-circle";
import File01Icon from "../../icons/untitled-ui/duocolor/file-01";
import GraduationHat01Icon from "../../icons/untitled-ui/duocolor/graduation-hat-01";
import HomeSmileIcon from "../../icons/untitled-ui/duocolor/home-smile";
import LayoutAlt02Icon from "../../icons/untitled-ui/duocolor/layout-alt-02";
import LineChartUp04Icon from "../../icons/untitled-ui/duocolor/line-chart-up-04";
import Lock01Icon from "../../icons/untitled-ui/duocolor/lock-01";
import LogOut01Icon from "../../icons/untitled-ui/duocolor/log-out-01";
import Mail03Icon from "../../icons/untitled-ui/duocolor/mail-03";
import Mail04Icon from "../../icons/untitled-ui/duocolor/mail-04";
import MessageChatSquareIcon from "../../icons/untitled-ui/duocolor/message-chat-square";
import ReceiptCheckIcon from "../../icons/untitled-ui/duocolor/receipt-check";
import Share07Icon from "../../icons/untitled-ui/duocolor/share-07";
import ShoppingBag03Icon from "../../icons/untitled-ui/duocolor/shopping-bag-03";
import ShoppingCart01Icon from "../../icons/untitled-ui/duocolor/shopping-cart-01";
import Truck01Icon from "../../icons/untitled-ui/duocolor/truck-01";
import Upload04Icon from "../../icons/untitled-ui/duocolor/upload-04";
import Users03Icon from "../../icons/untitled-ui/duocolor/users-03";
import XSquareIcon from "../../icons/untitled-ui/duocolor/x-square";
import { tokens } from "../../locales/tokens";
import { paths } from "../../paths";

export const getSections = (t) => [
  {
    items: [
      {
        title: t(tokens.nav.overview),
        path: paths.dashboard.portfolio,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.crypto),
        path: paths.dashboard.index2,
        icon: (
          <SvgIcon fontSize="small">
            <LayoutAlt02Icon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.tasks),
        path: paths.dashboard.tasks.index,
        icon: (
          <SvgIcon fontSize="small">
            <BarChartSquare02Icon />
          </SvgIcon>
        ),
      },
      // {
      //   title: t(tokens.nav.ecommerce),
      //   path: paths.dashboard.ecommerce,
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <LineChartUp04Icon />
      //     </SvgIcon>
      //   )
      // },

    ],
  },

  {
    subheader: t(tokens.nav.pages),
    items: [
      {
        title: t(tokens.nav.auth),
        icon: (
          <SvgIcon fontSize="small">
            <Lock01Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.login),
            items: [
              {
                title: "Classic",
                path: paths.auth.login.classic,
              },
              {
                title: "Modern",
                path: paths.auth.login.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.register),
            items: [
              {
                title: "Classic",
                path: paths.auth.register.classic,
              },
              {
                title: "Modern",
                path: paths.auth.register.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.forgotPassword),
            items: [
              {
                title: "Classic",
                path: paths.auth.forgotPassword.classic,
              },
              {
                title: "Modern",
                path: paths.auth.forgotPassword.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.resetPassword),
            items: [
              {
                title: "Classic",
                path: paths.auth.resetPassword.classic,
              },
              {
                title: "Modern",
                path: paths.auth.resetPassword.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.verifyCode),
            items: [
              {
                title: "Classic",
                path: paths.auth.verifyCode.classic,
              },
              {
                title: "Modern",
                path: paths.auth.verifyCode.modern,
              },
            ],
          },
        ],
      },
      {
        title: t(tokens.nav.auth),
        icon: (
          <SvgIcon fontSize="small">
            <Lock01Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.login),
            items: [
              {
                title: "Classic",
                path: paths.auth.login.classic,
              },
              {
                title: "Modern",
                path: paths.auth.login.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.register),
            items: [
              {
                title: "Classic",
                path: paths.auth.register.classic,
              },
              {
                title: "Modern",
                path: paths.auth.register.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.forgotPassword),
            items: [
              {
                title: "Classic",
                path: paths.auth.forgotPassword.classic,
              },
              {
                title: "Modern",
                path: paths.auth.forgotPassword.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.resetPassword),
            items: [
              {
                title: "Classic",
                path: paths.auth.resetPassword.classic,
              },
              {
                title: "Modern",
                path: paths.auth.resetPassword.modern,
              },
            ],
          },
          {
            title: t(tokens.nav.verifyCode),
            items: [
              {
                title: "Classic",
                path: paths.auth.verifyCode.classic,
              },
              {
                title: "Modern",
                path: paths.auth.verifyCode.modern,
              },
            ],
          },
        ],
      },
      {
        title: t(tokens.nav.pricing),
        path: paths.pricing,
        icon: (
          <SvgIcon fontSize="small">
            <CreditCard01Icon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.checkout),
        path: paths.checkout,
        icon: (
          <SvgIcon fontSize="small">
            <LogOut01Icon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.contact),
        path: paths.contact,
        icon: (
          <SvgIcon fontSize="small">
            <Mail04Icon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.error),
        icon: (
          <SvgIcon fontSize="small">
            <XSquareIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: "401",
            path: paths["401"],
          },
          {
            title: "404",
            path: paths["404"],
          },
          {
            title: "500",
            path: paths["500"],
          },
        ],
      },
    ],
  },
];
