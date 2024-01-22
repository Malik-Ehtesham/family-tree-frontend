import HomeCardLeft from "../HomeCardLeft/HomeCardLeft";
import HomeCardRight from "../HomeCardRight/HomeCardRight";

import Family1 from "../../utils/Images/Home/family1.jpg";
import Family2 from "../../utils/Images/Home/family2.jpg";
import Family3 from "../../utils/Images/Home/family3.jpg";
import Family4 from "../../utils/Images/Home/family4.jpg";

const HomeSection = () => {
  return (
    <div>
      <HomeCardLeft
        description="Welcome to our family tree platform, where cherished memories and meaningful connections come alive. Discover the power of heritage as we take you on a journey through generations, unveiling stories that shape our identities."
        image={Family4}
      />
      <HomeCardRight
        description="Explore the rich tapestry of your family's history with ease. Our intuitive tools simplify the process of building and visualizing your family tree, allowing you to connect the dots and uncover forgotten tales of triumphs, traditions, and enduring bonds."
        image={Family1}
      />
      <HomeCardLeft
        description="Imagine capturing and preserving the essence of your ancestry for future generations. With our user-friendly interface and comprehensive features, delve deeper into your roots, capturing cherished moments and anecdotes that define who you are."
        image={Family2}
      />
      <HomeCardRight
        description="Start your exploration today! Join our community of enthusiasts, discover the beauty of familial connections, and embark on a journey that celebrates the legacy of your family. Begin building your family tree and weave together the threads of your unique story."
        image={Family3}
      />
    </div>
  );
};

export default HomeSection;
