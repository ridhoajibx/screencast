import { NavLink } from 'react-router-dom';

export default function ListOfPlaylists({ lessons, slug }) {
    return (
        <div>
            {lessons.map((lesson, index) => (
                <li key={index} className="list-group-item">
                    <NavLink to={`/series/${slug}/${lesson.episode}`} className="text-decoration-none text-dark d-flex align-items-center px-3">
                        <i className="bi bi-play-circle-fill fs-2"></i>
                        <div className="ms-4">
                            {lesson.title}
                            <div style={{ fontSize: "13px" }} className="fw-medium text-secondary">Episode {lesson.episode}</div>
                        </div>
                    </NavLink>
                </li>
            ))
            }
        </div>
    )
}
