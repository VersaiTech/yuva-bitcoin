import { Chip, SvgIcon } from "@mui/material";
import PortfolioIcon from "../../icons/untitled-ui/duocolor/portfolio";
import CryptoIcon from "../../icons/untitled-ui/duocolor/crypto";
import Calendar from "../../icons/untitled-ui/duocolor/calendar";
import EarningsIcon from "../../icons/untitled-ui/duocolor/earnings";
import { tokens } from "../../locales/tokens";
import { paths } from "../../paths";
import DepositsIcon from "../../icons/untitled-ui/duocolor/deposits";
import StakesIcon from "../../icons/untitled-ui/duocolor/stakes";
import ContactIcon from "../../icons/untitled-ui/duocolor/contact";
import NewssIcon from "../../icons/untitled-ui/duocolor/newss";
import ReferalIcon from "../../icons/untitled-ui/duocolor/referal";
import WithdrawIcon from "../../icons/untitled-ui/duocolor/withdraw";
import Mail03 from "../../icons/untitled-ui/duocolor/mail-03";
import Support2Icon from "../../icons/untitled-ui/duocolor/support2";

export const getSections = (t) => [
  {
    items: [
      {
        title: t(tokens.nav.overview),
        path: paths.dashboard.portfolio,
        icon: (
          <SvgIcon fontSize="small">
            <PortfolioIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.marketplace),
        path: paths.dashboard.marketplace.index,
        icon: (
          <SvgIcon fontSize="small">
            <CryptoIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.tasks),
        icon: (
          <SvgIcon fontSize="small">
            <Calendar />
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
          },
          {
            title: t(tokens.nav.rejected),
            path: paths.dashboard.tasks.rejected
          }
        ]
      },
      {
        title: t(tokens.nav.earnings),
        path: paths.dashboard.earnings.index,
        icon: (
          <SvgIcon fontSize="small">
            <EarningsIcon />
          </SvgIcon>
        ),
        // items: [
        //   {
        //     title: t(tokens.nav.earnings),
        //     path: paths.dashboard.earnings.index
        //   },
        //   {
        //     title: t(tokens.nav.earningsDetails),
        //     path: paths.dashboard.earnings.details
        //   }
        // ]
      },
      {
        title: t(tokens.nav.convert),
        path: paths.dashboard.convert.index,
        icon: (
          <SvgIcon fontSize="small">
            <EarningsIcon />
          </SvgIcon>
        ),
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
            <DepositsIcon />
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
            <StakesIcon />
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
            <WithdrawIcon />
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
            <ReferalIcon />
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
        title: t(tokens.nav.news),
        path: paths.dashboard.news.list,
        icon: (
          <SvgIcon fontSize="small">
          {/* <Mail04Icon /> */}
          <NewssIcon />
        </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.support),
        path: paths.dashboard.support.create,
        icon: (
          <SvgIcon fontSize="small">
            <Support2Icon />
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
