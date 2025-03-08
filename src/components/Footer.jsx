import PropTypes from "prop-types";

const Footer = ({version}) => {
    return (
        <footer className="flex flex-col gap-2 text-center p-4 bottom-0 max-h-[10vh] w-full">
            <p>© {new Date().getFullYear()}</p>
            <p>Achedon12 - Pokedex - v{version}</p>
        </footer>
    );
};

Footer.propTypes = {
    version: PropTypes.string.isRequired,
};

export default Footer;