import PropTypes from "prop-types";

const Footer = ({version}) => {
    return (
        <footer className="text-center p-4 bottom-0">
            <p>© {new Date().getFullYear()} Achedon12 - Pokedex - v{version}</p>
        </footer>
    );
};

Footer.propTypes = {
    version: PropTypes.string.isRequired,
};

export default Footer;