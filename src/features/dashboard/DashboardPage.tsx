import {
  IconEye,
  IconHeart,
  IconMessage,
  IconInfoCircle,
} from "@tabler/icons-react";
import OverviewCard from "./OverviewCard";
import { shortNumber } from "@/utils/utils";
import StatTag from "@/components/StatTag/StatTag";
import Button from "@/components/Button/Button";
import CommentsSection from "../contentDetails/CommentsSection";
import { Link } from "react-router-dom";

interface OverviewCardData {
  id: number;
  title: string;
  description: string;
  trend: number;
}
const dashboardTitle = "Channel Overview";
const overviewCardsData: OverviewCardData[] = [
  {
    id: 1,
    title: shortNumber(15000),
    description: "Subscribers",
    trend: 150,
  },
  {
    id: 2,
    title: shortNumber(10000),
    description: "Total views",
    trend: -5.5,
  },
  {
    id: 3,
    title: shortNumber(100000),
    description: "Total likes",
    trend: 100,
  },
];
const recentVideosData = [
  {
    id: 121,
    title:
      "This might be the longest name for a video title you've ever seen, I know...",
    views: 1000000,
    likes: 100,
    comments: 10,
    thumbnail: "https://picsum.photos/300/200.webp?random=1",
  },
  {
    id: 122,
    title:
      "This might be the second longest name for a video title you've ever seen, I know...",
    views: 2000,
    likes: 100,
    comments: 10,
    thumbnail: "https://picsum.photos/300/200.webp?random=4",
  },
  {
    id: 123,
    title:
      "This might be the third longest name for a video title you've ever seen, I know...",
    views: 1000,
    likes: 100,
    comments: 10,
    thumbnail: "https://picsum.photos/300/200.webp?random=3",
  },
];
const commentsData = [
  {
    id: "UgwTTVUfeU4tUEBi8nN4AaABAg",
    author: "@random_mf6918",
    authorImageUrl:
      "https://yt3.ggpht.com/AAqKPRDq7O85pE_HU6whr4VawVYkeLzUaf7bsCNvfM1Q8CTq7kLaMCdqiync0htWKPwmlsdLrKU=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-22T06:59:18Z",
    comment:
      '<a href="https://www.youtube.com/watch?v=5NV6Rdv1a3I&amp;t=139">2:19</a><br><br><br><br>Were up all night to get 🎵🤖🌃<br><br>Were up all night to get 🎵🤖🌃<br><br>Were up all night to get 🎵🤖🌃<br><br>Were up all night to get 🎵🤖🌃<br><br>Yeah, Were up all night to get 🎵🤖🎸🌃<br><br>Together, Were up all night to get 🎵🤖 🎸🌃<br>(Lets get funk again🎵🤖)<br><br>Were up all night to get lucky 🎵🤖🌃🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀🍀🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀🍀🍀🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀🍀🍀🍀🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀🍀🍀🍀🍀🍀🍀<br><br>Were up all night to get lucky 🎵🤖🌃🍀🍀🍀🍀🍀🍀🍀🍀🍀🍀',
    likes: 0,
  },
  {
    id: "UgyLwnKdst8NvqH4tQR4AaABAg",
    author: "@flavioippoliti5938",
    authorImageUrl:
      "https://yt3.ggpht.com/ytc/AIdro_lglEVmFFvJcGTthjC40ZSDKFEIq_FMcZCu6WFK9q2d4jH4JFUcHxRkgfTb41TbZjELqg=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-22T06:06:42Z",
    comment:
      '<a href="https://www.youtube.com/watch?v=5NV6Rdv1a3I&amp;t=141">2:21</a>',
    likes: 0,
  },
  {
    id: "UgxTgbkMC_WWq-aQfz14AaABAg",
    author: "@jacobcazares-alvarez6080",
    authorImageUrl:
      "https://yt3.ggpht.com/ytc/AIdro_mLA-Lo7vZJmh04eFqwqv_F0MfOVjytxbkkn94Az9z2UA4=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T23:22:25Z",
    comment: "77777777777",
    likes: 1,
  },
  {
    id: "UgzNnkK831ZCJLRE7dl4AaABAg",
    author: "@TalipKöse-e6m",
    authorImageUrl:
      "https://yt3.ggpht.com/jOANKZXa_5LULhHc-YR8paFA97hyj0qQw7bATr3N7-qtgARguPwPhFugTPGvR7j3J7oXddZ69w=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T20:43:05Z",
    comment: "Dünyanın en iyi şarkısı",
    likes: 1,
  },
  {
    id: "Ugx5_9s5eiRMF6DDZJd4AaABAg",
    author: "@JoRge93678",
    authorImageUrl:
      "https://yt3.ggpht.com/TXdxTevaa8GrnN9fTqs81RAhb8AVN9I9CUFbvG-hlcvkOWznFTIxJV4q7hzT0KrWPKT8z1_vrw=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T19:32:23Z",
    comment:
      "el la ultima vez que escribo lo prometo si no me respondes te dejaré en paz si es lo contrario dime si podrás salir el día miércoles o jueves por favor necesito hablar contigo en persona prometo que será todo en paz sin reclamos bueno esperaré tu respuesta hasta mañana",
    likes: 0,
  },
  {
    id: "UgxrpBoY-Ikw5ukX-dd4AaABAg",
    author: "@OrendaCekanauskaite-p4v",
    authorImageUrl:
      "https://yt3.ggpht.com/csU-vQOZqXmtv-KqCGpGjnovY0nlD0ojdHQSwazJR3y0-1ZSmR5jB6JNVBHr1pkuWdYEpU8JMA=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T18:54:52Z",
    comment: "I was born star from",
    likes: 0,
  },
  {
    id: "UgyAWR2MjMadZGMIM2p4AaABAg",
    author: "@evienarina",
    authorImageUrl:
      "https://yt3.ggpht.com/ytc/AIdro_nJa5slHM4gPY5Tiib4PGNwhC11y97q7DOZs-q1Cx5VVUg=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T16:59:17Z",
    comment: "MY FRIENDS IN SQUATT",
    likes: 0,
  },
  {
    id: "Ugygd0zclb3Dndd8x154AaABAg",
    author: "@ThurZãoedits",
    authorImageUrl:
      "https://yt3.ggpht.com/161l-7Stsqo6ZF7Ekfg3iUQbBKvAbbsXcgkwH954QfP82ueVL6kIVZ5BkbcwDlBLuw5zla56kCs=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T14:13:19Z",
    comment:
      "Estou chorando porque?<br>Pais antigo e pais novo<br>2022<br>Meu AUGE<br>Também AUGE na história e geografia <br>Foi a famosa época do &quot;AUGE&quot; dessa música, mas alguém ai lembra dos paises novos e antigos, onde os novos eram essa voz, e o antigo era plateia....",
    likes: 0,
  },
  {
    id: "Ugzuv5sJxmjw2oiuX3x4AaABAg",
    author: "@mateuszamadeusz6894",
    authorImageUrl:
      "https://yt3.ggpht.com/ytc/AIdro_lkd0rxDNf5fMK_UoPYRhOsgwNtwY9ZOs1KY-dpA5QhVhAqxMEwBKhHbjPdHHUvhecsUw=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T13:06:58Z",
    comment: "Im 34 and Im drunk and this is good",
    likes: 0,
  },
  {
    id: "UgxE2eQVCfvUFWDNIfV4AaABAg",
    author: "@morpheus_9",
    authorImageUrl:
      "https://yt3.ggpht.com/j8s_AW0rFdneHXbldgx7PzQM4A5hTA2qwd41mswi_KUrSi3_ITfsnj5MJ0IBelWSnU3nKUcZPQ=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T06:43:12Z",
    comment:
      "So did Pharrell make the guitar beat and daft punk make the robot voices or did they make this beat together?",
    likes: 1,
  },
  {
    id: "Ugx87DPbaAjU2ddsOoJ4AaABAg",
    author: "@sonikUk",
    authorImageUrl:
      "https://yt3.ggpht.com/ytc/AIdro_mEkJifwwRnhIauwKeOElwwBQAMywyHcDpJnWZEjzIDMg=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T01:04:58Z",
    comment:
      "LYRICS 🎵🎵<br> <br>Like the legend of the phoenix<br>All ends with beginnings<br>What keeps the planet spinning<br>The force from the beginning<br><br>We&#39;ve come too far<br>To give up who we are<br>So let&#39;s raise the bar<br>And our cups to the stars<br><br>She&#39;s up all night &#39;til the sun<br>I&#39;m up all night to get some<br>She&#39;s up all night for good fun<br>I&#39;m up all night to get lucky<br>We&#39;re up all night &#39;til the sun<br>We&#39;re up all night to get some<br>We&#39;re up all night for good fun<br>We&#39;re up all night to get lucky<br><br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br><br>The present has no ribbon<br>Your gift keeps on giving<br>What is this I&#39;m feeling?<br>If you wanna leave I&#39;m with it, ah<br><br>We&#39;ve come too far<br>To give up who we are<br>So let&#39;s raise the bar<br>And our cups to the stars<br><br>She&#39;s up all night &#39;til the sun<br>I&#39;m up all night to get some<br>She&#39;s up all night for good fun<br>I&#39;m up all night to get lucky<br>We&#39;re up all night &#39;til the sun<br>We&#39;re up all night to get some<br>We&#39;re up all night for good fun<br>We&#39;re up all night to get lucky<br><br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br><br>We&#39;re up all night to get-<br>We&#39;re up all night to get-<br>We&#39;re up all night to get-<br>We&#39;re up all night to get <br><br>We&#39;re up all night to get back together<br>We&#39;re up all night to get (let&#39;s get back together!)<br>We&#39;re up all night to get funky<br>We&#39;re up all night to get lucky<br><br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br><br>We&#39;ve come too far<br>To give up who we are<br>So let&#39;s raise the bar<br>And our cups to the stars<br><br>She&#39;s up all night &#39;til the sun<br>I&#39;m up all night to get some<br>She&#39;s up all night for good fun<br>I&#39;m up all night to get lucky<br>We&#39;re up all night &#39;til the sun<br>We&#39;re up all night to get some<br>We&#39;re up all night for good fun<br>We&#39;re up all night to get lucky<br><br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br><br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky<br>We&#39;re up all night to get lucky",
    likes: 2,
  },
  {
    id: "UgxS0cQJPaMaXls8LhN4AaABAg",
    author: "@darksols-t1q",
    authorImageUrl:
      "https://yt3.ggpht.com/zICne8VecQxtGtODNac76amkdc4X0854zOX6S4-iQsKlv2YoTPevN34OtG54xtzKwstomyqd_i4=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-21T00:51:58Z",
    comment: "Where is 2025 😢",
    likes: 2,
  },
  {
    id: "UgzCTxcDK-ZV9WKB2PN4AaABAg",
    author: "@LíviaLakatos-g5s",
    authorImageUrl:
      "https://yt3.ggpht.com/ytc/AIdro_nxMusYOshjCAeD1E5cB-v8_HTbCHBiZVsl7OXhGTyxmWSWQ5RBwYvERFVkc_fUGtejGA=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-20T20:15:04Z",
    comment: "❤❤❤❤",
    likes: 1,
  },
  {
    id: "Ugy_8RdEmkbW7RY-QGt4AaABAg",
    author: "@ClawPlotagonKilled",
    authorImageUrl:
      "https://yt3.ggpht.com/4UcNaGVNTHFL6VYEelAG_PZGx9OveMBI9qRmim8WsvoS5WTtt9bL_8EepaYGoInUx3lhtXk34w=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-20T16:18:06Z",
    comment:
      "my armpit hair started to stand up by itself when the guys stood up",
    likes: 1,
  },
  {
    id: "UgxxWSKuFsNBpXZnHyV4AaABAg",
    author: "@ClawPlotagonKilled",
    authorImageUrl:
      "https://yt3.ggpht.com/4UcNaGVNTHFL6VYEelAG_PZGx9OveMBI9qRmim8WsvoS5WTtt9bL_8EepaYGoInUx3lhtXk34w=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-20T16:16:53Z",
    comment:
      '<a href="https://www.youtube.com/watch?v=5NV6Rdv1a3I&amp;t=66">1:06</a> is the part from that iOS 7 commercial',
    likes: 1,
  },
  {
    id: "UgwCDMP8Ww4WmR4ICDd4AaABAg",
    author: "@sashayed",
    authorImageUrl:
      "https://yt3.ggpht.com/xmoEFer3FxRw868U3VnE24XhprEyu7PmVxjwzUUcJ4MxdIMYonunwm6fcoEOMXH5_mnnA_Wtqw=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-20T15:57:39Z",
    comment: "Who is here in 2025 🎉",
    likes: 3,
  },
  {
    id: "UgwFhsDWtAu6RHknKEJ4AaABAg",
    author: "@khuli3705",
    authorImageUrl:
      "https://yt3.ggpht.com/oFj3KxBd-XxZEPZG22UpFtxUoPRsmTah0XxJimYFm6ABg0XHhCjedsJAKuIDxdjhTiY6s4wO=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-20T15:28:33Z",
    comment: "One of my all time top 5 songs",
    likes: 1,
  },
  {
    id: "UgwpzXeAHVDaBgas6PJ4AaABAg",
    author: "@LinzzenBMC",
    authorImageUrl:
      "https://yt3.ggpht.com/yQw4ntnvuqqyzmoU1XGk4Iy6aTePH14XBFcEMUf4A1jWR5QSoAgQxbkCI2lsMWSMH_AYu-Y5bw=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-20T13:07:08Z",
    comment: "😂2013-2021 😢<br>Una buena canción que murió por los tiempos",
    likes: 2,
  },
  {
    id: "Ugw4S-bpTlJ50bmMp9d4AaABAg",
    author: "@xxould",
    authorImageUrl:
      "https://yt3.ggpht.com/qbJC5ZUsqnXZE7rz37_V6B13qH18bZnU3yyfgi9IV0N2djXFiT26UIq40pf0gylXdwKNj_gCBWc=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-20T00:30:43Z",
    comment: "BEAUTIFUL",
    likes: 2,
  },
  {
    id: "UgxlLl2JBScwYStjKgx4AaABAg",
    author: "@patricebelassen7333",
    authorImageUrl:
      "https://yt3.ggpht.com/ytc/AIdro_kCZEMHchmXALA_eeeRQ5maHWECqJqpbG7MFFFQZpn_oWc=s48-c-k-c0x00ffffff-no-rj",
    publishedAt: "2025-04-19T17:39:55Z",
    comment:
      "Ça funk bien  , mais bon... Daft Punk  , tu peux remercier ton papa  , qui a bossé sur un🎉 morceau de Donna Summer..ps : sinon vous n&#39;aurez jamais exister..",
    likes: 1,
  },
];
const recentVideosTitle = "Recent Videos";
const DashboardPage = () => {
  return (
    <section className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">{dashboardTitle}</h1>
        <div className="flex gap-4">
          {overviewCardsData.map((card) => (
            <OverviewCard
              key={card.id}
              title={card.title}
              description={card.description}
              trend={card.trend}
              className={`basis-1/${overviewCardsData.length}`}
            />
          ))}
        </div>
      </section>
      <section className="flex gap-4 flex-col">
        <h1 className="text-2xl font-bold text-white">{recentVideosTitle}</h1>
        <div className="flex gap-4 flex-col">
          {recentVideosData.map((video) => (
            <div key={video.id} className="flex gap-2 max-h-48 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="thumbnail w-64 h-36 object-cover"
              />
              <div className="metadata flex flex-col gap-2">
                <h2 className="text-lg font-bold text-white">{video.title}</h2>
                <div className="statistics flex gap-2">
                  <StatTag
                    label={{
                      text: shortNumber(video.views),
                      className: "text-zinc-300 text-md",
                    }}
                    icon={{
                      className: "text-zinc-500",
                      IconComponent: IconEye,
                    }}
                  />
                  <StatTag
                    label={{
                      text: shortNumber(video.likes),
                      className: "text-zinc-300 text-md",
                    }}
                    icon={{
                      className: "text-zinc-500",
                      IconComponent: IconHeart,
                    }}
                  />
                  <StatTag
                    label={{
                      text: shortNumber(video.comments),
                      className: "text-zinc-300 text-md",
                    }}
                    icon={{
                      className: "text-zinc-500",
                      IconComponent: IconMessage,
                    }}
                  />
                </div>
                <Link to={`/details/${"5NV6Rdv1a3I"}`}>
                  <Button>
                    <IconInfoCircle className="" />
                    <span>Watch</span>
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col gap-2 overflow-scroll">
                <CommentsSection
                  id={"5NV6Rdv1a3I"}
                  accessToken={"accessToken"}
                  commentCount={"25"}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default DashboardPage;
