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
import NewsIcon from "../../icons/untitled-ui/duocolor/news";
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
        title: t(tokens.nav.marketplace),
        icon: (
          <SvgIcon fontSize="small">
            <BarChartSquare02Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.cryptos),
            path: paths.dashboard.marketplace.index
          },
        ]
      },
      {
        title: t(tokens.nav.tasks),
        icon: (
          <SvgIcon fontSize="small">
            <BarChartSquare02Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.todayTasks),
            path: paths.dashboard.tasks.today
          },
          {
            title: t(tokens.nav.pending),
            path: paths.dashboard.tasks.pending
          },
          {
            title: t(tokens.nav.completedTasks),
            path: paths.dashboard.tasks.completedTasks
          }
        ]
      },
      {
        title: t(tokens.nav.earnings),
        // path: paths.dashboard.earnings.index,
        icon: (
          <SvgIcon fontSize="small">
            <LineChartUp04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.earnings),
            path: paths.dashboard.earnings.index
          },
          {
            title: t(tokens.nav.earningsDetails),
            path: paths.dashboard.earnings.details
          }
        ]
      },
    ],
  },
  {
    subheader: t(tokens.nav.pages),
    items: [
      {
        title: t(tokens.nav.deposit),
        icon: (
          <SvgIcon fontSize="small">
            <LineChartUp04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.deposit),
            path: paths.dashboard.deposits.index
          },
          {
            title: t(tokens.nav.depositHistory),
            path: paths.dashboard.deposits.depositsHistory
          }
        ]
      },
      {
        title: t(tokens.nav.stake),
        icon: (
          <SvgIcon fontSize="small">
            <LineChartUp04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.stake),
            path: paths.dashboard.stake.create
          },
          {
            title: t(tokens.nav.stakeHistory),
            path: paths.dashboard.stake.index
          }
        ]
      },
      {
        title: t(tokens.nav.withdraw),
        icon: (
          <SvgIcon fontSize="small">
            <LineChartUp04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.withdraw),
            path: paths.dashboard.withdraw.create
          },
          {
            title: t(tokens.nav.withdrawHistory),
            path: paths.dashboard.withdraw.index
          }
        ]
      },
      {
        title: t(tokens.nav.referral),
        icon: (
          <SvgIcon fontSize="small">
            <LineChartUp04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.refer),
            path: paths.dashboard.refer.index
          },
          {
            title: t(tokens.nav.referralHistory),
            path: paths.dashboard.refer.referHistory
          }
        ]
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
        title: t(tokens.nav.news),
        path: paths.dashboard.news.list,
        icon: (
          <SvgIcon fontSize="small">
          {/* <Mail04Icon /> */}
          <NewsIcon />
        </SvgIcon>
        ),
      },
      // {
      //   title: t(tokens.nav.error),
      //   icon: (
      //     <SvgIcon fontSize="small">
      //       <XSquareIcon />
      //     </SvgIcon>
      //   ),
      //   items: [
      //     {
      //       title: "401",
      //       path: paths["401"],
      //     },
      //     {
      //       title: "404",
      //       path: paths["404"],
      //     },
      //     {
      //       title: "500",
      //       path: paths["500"],
      //     },
      //   ],
      // },
    ],
  },
];
