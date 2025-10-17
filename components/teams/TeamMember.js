import Link from "next/link";
import Image from "next/legacy/image";
import Tilt from "react-parallax-tilt";
import { placeholderLight } from "../../helpers/utilities";

const TeamMember = ({team, CardBorder, CardAnimation, TitleColor }) => {
  return (
    <>
      <Tilt
        tiltMaxAngleX={CardAnimation ? 0 : 9}
        tiltMaxAngleY={CardAnimation ? 0 : 9}
      >
        <div className="axil-team">
          <div className={`inner ${CardBorder ? "noborder" : ""}`}>
            {team?.image && (
              <div className={`thumbnail paralax-image`}>
                {team?.ImageLink?.url || team?.ImageLink?.story?.url ? (
                  <Link
                    href={team?.ImageLink?.url || team?.ImageLink?.story?.url}
                    legacyBehavior
                  >
                    <a target={team?.ImageLink?.target}>
                      <Image
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL={placeholderLight}
                        width={600}
                        height={560}
                        className="w-100"
                        src={team?.image}
                        alt={team?.Image?.alt ? team?.Image?.alt : team?.Name}
                      />
                    </a>
                  </Link>
                ) : (
                  <Image
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={placeholderLight}
                    width={600}
                    height={560}
                    className="w-100"
                    src={team?.image}
                    alt={team?.Image?.alt ? team?.Image?.alt : team?.Name}
                  />
                )}
              </div>
            )}
            <div className="content">
              {team?.name && (
                <h3
                  className="title"
                  style={TitleColor ? { color: TitleColor } : {}}
                >
                  {team?.ImageLink?.url || team?.ImageLink?.story?.url ? (
                    <Link
                      href={team?.ImageLink?.url || team?.ImageLink?.story?.url}
                      legacyBehavior
                    >
                      {team?.name}
                    </Link>
                  ) : (
                    <>{team?.name}</>
                  )}
                </h3>
              )}
              {team?.role && (
                <p className="subtitle">{team?.role}</p>
              )}
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
};

export default TeamMember;
