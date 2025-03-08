const NavBar = () => {

    const toggleNavBar = () => {
        let nav = document.querySelector(".navbar");
        const toggleButton = document.querySelector(".toggle");
        const isCollapsed = nav.classList.contains("collapsed");

        // Toggle the navbar collapse state
        nav.classList.toggle("collapsed", !isCollapsed);

        // Change the toggle button icon text based on the navbar state
        if (isCollapsed) {
            toggleButton.innerHTML =
                '<span class="material-symbols-outlined">chevron_left</span>';
        } else {
            toggleButton.innerHTML =
                '<span class="material-symbols-outlined">chevron_right</span>';
        }
    }

    return (
        <nav className="navbar">
            <section className="profile">
                <img className="avatar"
                     src="/pokedex/images/sacha.png"
                     alt="avatar"/>
                <span className="nav-text name">
                  <p>Sasha</p>
                  <p>Pokemon Trainer</p>
                </span>
            </section>
            <hr/>
            <section className="main">
                <div className="nav-item">
                      <span className="material-symbols-rounded">
                        home
                      </span>
                    <span className="nav-text">Dashboard</span>
                </div>
                <div className="nav-item">
                    <span className="material-symbols-rounded">person</span>
                    <span className="nav-text">Audience</span>
                </div>
                <div className="nav-item">
                    <span className="material-symbols-rounded">article</span>
                    <span className="nav-text">Posts</span>
                </div>
                <div className="nav-item current">
                    <span className="material-symbols-rounded">calendar_month</span>
                    <span className="nav-text">Schedules</span>
                </div>
            </section>
            <button className="toggle" onClick={toggleNavBar}>
                <span className="material-symbols-outlined">chevron_left</span>
            </button>
        </nav>
    );
}

export default NavBar;