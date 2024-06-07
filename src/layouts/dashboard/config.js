import { Chip, SvgIcon } from "@mui/material";
import { tokens } from "../../locales/tokens";
import { paths } from "../../paths";
import CryptoIcon from "../../icons/untitled-ui/duocolor/crypto";
import AddAgent from "../../icons/untitled-ui/duocolor/addAgent";
import Icon from "../../icons/untitled-ui/duocolor/adminControl";
import SetValue from "../../icons/untitled-ui/duocolor/setValue";
import Calendar from "../../icons/untitled-ui/duocolor/calendar";
import EarningsIcon from "../../icons/untitled-ui/duocolor/earnings";
import DepositsIcon from "../../icons/untitled-ui/duocolor/deposits";
import StakesIcon from "../../icons/untitled-ui/duocolor/stakes";
import NewssIcon from "../../icons/untitled-ui/duocolor/newss";
import ReferalIcon from "../../icons/untitled-ui/duocolor/referal";
import WithdrawIcon from "../../icons/untitled-ui/duocolor/withdraw";
import Support2Icon from "../../icons/untitled-ui/duocolor/support2";
import BlackIcon from "../../icons/untitled-ui/duocolor/adminControl";
import CustomIcon from "../../icons/untitled-ui/duocolor/adminControl";
import CustomSVG from "../../icons/untitled-ui/duocolor/adminControl";
// import ReferalIcon from "../../icons/untitled-ui/duocolor/referal";

export const getSections = (t) => [
  {
    items: [
      {
        title: t(tokens.nav.overview),
        path: paths.dashboard.portfolio,
        icon: (
          <SvgIcon fontSize="small">
            <CryptoIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.admincontrol),
        path: paths.dashboard.admincontrol,
        icon: (
          <SvgIcon fontSize="small">
            <CustomSVG />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.addagent),
        path: paths.dashboard.addagent,
        icon: (
          <SvgIcon fontSize="small">
            <AddAgent />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.values),
        path: paths.dashboard.values.index,
        icon: (
          <SvgIcon fontSize="small">
            <SetValue />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.newtask),
        icon: (
          <SvgIcon fontSize="small">
            <Calendar />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.createtask),
            path: paths.dashboard.newtask.index,
          },
          {
            title: t(tokens.nav.approvetask),
            path: paths.dashboard.taskwork.index,
          },
        ],
      },
    ],
  },
  {
    subheader: t(tokens.nav.pages),
    items: [
      {
        title: t(tokens.nav.users),
        icon: (
          <SvgIcon fontSize="small">
            <ReferalIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.allUsers),
            path: paths.dashboard.users.index,
            // icon: (
            //   <SvgIcon fontSize="small">
            //     <HomeSmileIcon />
            //   </SvgIcon>
            // ),
          },
          {
            title: t(tokens.nav.activeUsers),
            path: paths.dashboard.users.active,
          },
          {
            title: t(tokens.nav.blockedUsers),
            path: paths.dashboard.users.blocked,
          },
          // {
          //   title: t(tokens.nav.resetPassword),
          //   items: [
          //     {
          //       title: "Classic",
          //       path: paths.auth.resetPassword.classic,
          //     },
          //     {
          //       title: "Modern",
          //       path: paths.auth.resetPassword.modern,
          //     },
          //   ],
          // },
          // {
          //   title: t(tokens.nav.verifyCode),
          //   items: [
          //     {
          //       title: "Classic",
          //       path: paths.auth.verifyCode.classic,
          //     },
          //     {
          //       title: "Modern",
          //       path: paths.auth.verifyCode.modern,
          //     },
          //   ],
          // },
        ],
      },

      {
        title: t(tokens.nav.withdrawal),
        icon: (
          <SvgIcon fontSize="small">
            <WithdrawIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.allwithdrawal),
            path: paths.dashboard.withdrawal.index,

            // path: path.dashboard.withdrawal.index,
          },
          {
            title: t(tokens.nav.pendingWithdrawal),
            path: paths.dashboard.withdrawal.pending,
          },
          // {
          //   title: t(tokens.nav.rejectedWithdrawal),
          //   path: paths.dashboard.withdrawal.rejected,
          // },
          // {
          //   title: t(tokens.nav.completedWithdrawal),
          //   path: paths.dashboard.withdrawal.completed,
          // },
        ],
      },
      {
        title: t(tokens.nav.deposit),
        path: paths.dashboard.deposit.index,
        // path: paths.dashboard.deposit.index,
        icon: (
          <SvgIcon fontSize="small">
            <DepositsIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.external_deposit),
        path: paths.dashboard.exdeposit.index,
        // path: paths.dashboard.deposit.index,
        icon: (
          <SvgIcon fontSize="small">
            <DepositsIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.Stake),
        path: paths.dashboard.Stake.index,
        icon: (
          <SvgIcon fontSize="small">
            <StakesIcon />
          </SvgIcon>
        ),
      },

      {
        title: t(tokens.nav.support),
        path: paths.dashboard.support.list,
        icon: (
          <SvgIcon fontSize="small">
            <Support2Icon />
          </SvgIcon>
        ),
      },

      {
        title: t(tokens.nav.referralRecord),

        icon: (
          <SvgIcon fontSize="small">
            <ReferalIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.todayreferral),
            path: paths.dashboard.refer.todayreffer,
          },
          {
            title: t(tokens.nav.refer),
            path: paths.dashboard.refer.index,
          },
        ],
      },

      {
        title: t(tokens.nav.news),
        // path: paths.contact,
        icon: (
          <SvgIcon fontSize="small">
            {/* <Mail04Icon /> */}
            <NewssIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.createnews),
            path: paths.dashboard.news.create,
          },
          {
            title: t(tokens.nav.newslist),
            path: paths.dashboard.news.list,
          },
        ],
      },
    ],
  },
];
