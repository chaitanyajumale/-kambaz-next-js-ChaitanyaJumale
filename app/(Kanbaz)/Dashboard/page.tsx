import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.webp" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div><br></br>
        <div className="wd-dashboard-course">
            <Link href="/Courses/12122" className="wd-dashboard-course-link">
            <Image src="/images/next.png" width={200} height={150} />
            <div>
              <h5> CS12122 Next JS </h5>
              <p className="wd-dashboard-course-title">
                Next JS developer
              </p>
              <button> Go </button>
            </div>
            </Link>
        </div><br></br>
        <div className="wd-dashboard-course">
            <Link href="/Courses/12121" className="wd-dashboard-course-link">
            <Image src="/images/java.jpeg" width={200} height={150} />
            <div>
              <h5> CS12121 PDP </h5>
              <p className="wd-dashboard-course-title">
                Java software developer
              </p>
              <button> Go </button>
            </div>
            </Link>
        </div><br></br>
        <div className="wd-dashboard-course">
            <Link href="/Courses/3232" className="wd-dashboard-course-link">
            <Image src="/images/AI.jpg" width={200} height={150} />
            <div>
              <h5> CS3232 AI </h5>
              <p className="wd-dashboard-course-title">
                AI software developer
              </p>
              <button> Go </button>
            </div>
            </Link>
        </div><br></br>
        <div className="wd-dashboard-course">
            <Link href="/Courses/2121212" className="wd-dashboard-course-link">
            <Image src="/images/ml.jpeg" width={200} height={150} />
            <div>
              <h5> CS2121212 ML </h5>
              <p className="wd-dashboard-course-title">
                ML software developer
              </p>
              <button> Go </button>
            </div>
            </Link>
        </div><br></br>
        <div className="wd-dashboard-course">
            <Link href="/Courses/43212" className="wd-dashboard-course-link">
            <Image src="/images/game.png" width={200} height={150} />
            <div>
              <h5> CS43212 ML </h5>
              <p className="wd-dashboard-course-title">
                Game developer
              </p>
              <button> Go </button>
            </div>
            </Link>
        </div><br></br>
        <div className="wd-dashboard-course">
            <Link href="/Courses/87631" className="wd-dashboard-course-link">
            <Image src="/images/go.png" width={200} height={150} />
            <div>
              <h5> CS87631 GO </h5>
              <p className="wd-dashboard-course-title">
                GO software developer
              </p>
              <button> Go </button>
            </div>
            </Link>
        </div>
      </div>
    </div>
);}
