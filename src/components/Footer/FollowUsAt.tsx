'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFacebook,
    faInstagram,
    faLinkedin,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons'

export default function FollowUsAt() {
    return (
        <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-muted-foreground">Follow us at:</p>
            <div className="flex space-x-4">
                <a
                    href="https://facebook.com"
                    className="text-muted-foreground"
                >
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
                <a href="https://twitter.com" className="text-muted-foreground">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </a>
                <a
                    href="https://instagram.com"
                    className="text-muted-foreground"
                >
                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a
                    href="https://linkedin.com"
                    className="text-muted-foreground"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
            </div>
        </div>
    )
}
