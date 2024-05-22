import { Chip, SvgIcon } from "@mui/material";
import { tokens } from "../../locales/tokens";
import { paths } from "../../paths";
import CryptoIcon from "../../icons/untitled-ui/duocolor/crypto";
import Calendar from "../../icons/untitled-ui/duocolor/calendar";
import EarningsIcon from "../../icons/untitled-ui/duocolor/earnings";
import DepositsIcon from "../../icons/untitled-ui/duocolor/deposits";
import StakesIcon from "../../icons/untitled-ui/duocolor/stakes";
import NewssIcon from "../../icons/untitled-ui/duocolor/newss";
import ReferalIcon from "../../icons/untitled-ui/duocolor/referal";
import WithdrawIcon from "../../icons/untitled-ui/duocolor/withdraw";
import Support2Icon from "../../icons/untitled-ui/duocolor/support2";
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
  // {
  //   subheader: t(tokens.nav.concepts),
  //   items: [
  //     {
  //       title: t(tokens.nav.crypto),
  //       path: paths.dashboard.crypto,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <CurrencyBitcoinCircleIcon />
  //         </SvgIcon>
  //       ),
  //       label: <Chip color="primary" label="New" size="small" />,
  //     },
  //     {
  //       title: t(tokens.nav.customers),
  //       path: paths.dashboard.customers.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Users03Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.list),
  //           path: paths.dashboard.customers.index,
  //         },
  //         {
  //           title: t(tokens.nav.details),
  //           path: paths.dashboard.customers.details,
  //         },
  //         {
  //           title: t(tokens.nav.edit),
  //           path: paths.dashboard.customers.edit,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.productList),
  //       path: paths.dashboard.products.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <ShoppingBag03Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.list),
  //           path: paths.dashboard.products.index,
  //         },
  //         {
  //           title: t(tokens.nav.create),
  //           path: paths.dashboard.products.create,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.orderList),
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <ShoppingCart01Icon />
  //         </SvgIcon>
  //       ),
  //       path: paths.dashboard.orders.index,
  //       items: [
  //         {
  //           title: t(tokens.nav.list),
  //           path: paths.dashboard.orders.index,
  //         },
  //         {
  //           title: t(tokens.nav.details),
  //           path: paths.dashboard.orders.details,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.invoiceList),
  //       path: paths.dashboard.invoices.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <ReceiptCheckIcon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.list),
  //           path: paths.dashboard.invoices.index,
  //         },
  //         {
  //           title: t(tokens.nav.details),
  //           path: paths.dashboard.invoices.details,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.logistics),
  //       path: paths.dashboard.logistics.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Truck01Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.dashboard),
  //           path: paths.dashboard.logistics.index,
  //         },
  //         {
  //           title: t(tokens.nav.fleet),
  //           path: paths.dashboard.logistics.fleet,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.academy),
  //       path: paths.dashboard.academy.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <GraduationHat01Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.dashboard),
  //           path: paths.dashboard.academy.index,
  //         },
  //         {
  //           title: t(tokens.nav.course),
  //           path: paths.dashboard.academy.courseDetails,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.jobList),
  //       path: paths.dashboard.jobs.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Building04Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.browse),
  //           path: paths.dashboard.jobs.index,
  //         },
  //         {
  //           title: t(tokens.nav.details),
  //           path: paths.dashboard.jobs.companies.details,
  //         },
  //         {
  //           title: t(tokens.nav.create),
  //           path: paths.dashboard.jobs.create,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.socialMedia),
  //       path: paths.dashboard.social.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Share07Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.profile),
  //           path: paths.dashboard.social.profile,
  //         },
  //         {
  //           title: t(tokens.nav.feed),
  //           path: paths.dashboard.social.feed,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.blog),
  //       path: paths.dashboard.blog.index,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <LayoutAlt02Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: t(tokens.nav.postList),
  //           path: paths.dashboard.blog.index,
  //         },
  //         {
  //           title: t(tokens.nav.postDetails),
  //           path: paths.dashboard.blog.postDetails,
  //         },
  //         {
  //           title: t(tokens.nav.postCreate),
  //           path: paths.dashboard.blog.postCreate,
  //         },
  //       ],
  //     },
  //     {
  //       title: t(tokens.nav.fileManager),
  //       path: paths.dashboard.fileManager,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Upload04Icon />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: t(tokens.nav.kanban),
  //       path: paths.dashboard.kanban,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <CheckDone01Icon />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: t(tokens.nav.mail),
  //       path: paths.dashboard.mail,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <Mail03Icon />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: t(tokens.nav.chat),
  //       path: paths.dashboard.chat,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <MessageChatSquareIcon />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: t(tokens.nav.calendar),
  //       path: paths.dashboard.calendar,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <CalendarIcon />
  //         </SvgIcon>
  //       ),
  //     },
  //   ],
  // },
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
          {
            title: t(tokens.nav.rejectedWithdrawal),
            path: paths.dashboard.withdrawal.rejected,
          },
          {
            title: t(tokens.nav.completedWithdrawal),
            path: paths.dashboard.withdrawal.completed,
          },

          // },
          // {
          //   title: t(tokens.nav.forgotPassword),
          //   items: [
          //     {
          //       title: "Classic",
          //       path: paths.auth.forgotPassword.classic,
          //     },
          //     {
          //       title: "Modern",
          //       path: paths.auth.forgotPassword.modern,
          //     },
          //   ],
          // },
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
        title: t(tokens.nav.deposit),
        path: paths.dashboard.deposit.index,
        // path: paths.dashboard.deposit.index,
        icon: (
          <SvgIcon fontSize="small">
            <DepositsIcon />
          </SvgIcon>
        ),
        // items: [
        //   {
        //     title: t(tokens.nav.alldeposit),
        //   },
        //   // {
        //   //   title: t(tokens.nav.pendingDeposit),
        //   //   path: paths.dashboard.deposit.pending,
        //   // },
        //   // {
        //   //   title: t(tokens.nav.completedDeposit),
        //   //   path: paths.dashboard.deposit.completed,
        //   // },
        // ],
      },
      {
        title: t(tokens.nav.Stake),
        path: paths.dashboard.Stake.index,
        icon: (
          <SvgIcon fontSize="small">
            <StakesIcon />
          </SvgIcon>
        ),
        // items: [
        //   {
        //     title: t(tokens.nav.alldeposit),
        //     path: paths.dashboard.deposit.index,
        //   },
        //   {
        //     title: t(tokens.nav.pendingDeposit),
        //     path: paths.dashboard.deposit.pending,
        //   },
        //   {
        //     title: t(tokens.nav.completedDeposit),
        //     path: paths.dashboard.deposit.completed,
        //   },
        // ],
      },

      {
        title: t(tokens.nav.support),
        path: paths.dashboard.support.list,
        icon: (
          <SvgIcon fontSize="small">
            <Support2Icon />
          </SvgIcon>
        ),
        // items: [
        //   {
        //     title: t(tokens.nav.supportList),
        //   }
        // ]
      },

      {
        title: t(tokens.nav.referral),
        path: paths.dashboard.refer.index,
        icon: (
          <SvgIcon fontSize="small">
            <ReferalIcon />
          </SvgIcon>
        ),
        // items: [
          //   {
            //     title: t(tokens.nav.refer),
            //   },
            // ]
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
  // {
  //   subheader: "Misc",
  //   items: [
  //     {
  //       title: "Level 0",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <AlignLeft02Icon />
  //         </SvgIcon>
  //       ),
  //       items: [
  //         {
  //           title: "Level 1a",
  //           items: [
  //             {
  //               title: "Level 2a",
  //               items: [
  //                 {
  //                   title: "Level 3a",
  //                 },
  //                 {
  //                   title: "Level 3b",
  //                   disabled: true,
  //                 },
  //               ],
  //             },
  //             {
  //               title: "Level 2b",
  //             },
  //           ],
  //         },
  //         {
  //           title: "Level 1b",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Disabled",
  //       disabled: true,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <XSquareIcon />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: "Label",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <File01Icon />
  //         </SvgIcon>
  //       ),
  //       label: <Chip color="primary" label="New" size="small" />,
  //     },
  //     {
  //       title: "Blank",
  //       path: paths.dashboard.blank,
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <File01Icon />
  //         </SvgIcon>
  //       ),
  //     },
  //     {
  //       title: "External Link",
  //       path: "https://yuvabitcoin.com",
  //       icon: (
  //         <SvgIcon fontSize="small">
  //           <File01Icon />
  //         </SvgIcon>
  //       ),
  //     },
  //   ],
  // },
];
