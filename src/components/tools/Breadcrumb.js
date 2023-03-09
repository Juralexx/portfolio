import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Icon from './icons/Icon';

function titleize(str) {
    let dashesToSpace = str.replace(/-/g, ' ')
    return dashesToSpace.charAt(0).toUpperCase() + dashesToSpace.slice(1)
}

function Crumb({ text, href, last = false }) {
    if (last) {
        return <p>{text}</p>
    } else {
        return (
            <Link to={href}>
                <span>{text}</span><Icon name="CaretRight" />
            </Link>
        )
    }
}

const Breadcrumbs = ({ denomination, description, className }) => {
    const url = typeof window !== 'undefined' ? window.location.pathname : '';
    const isBrowser = typeof window !== "undefined";
    const [current, setCurrent] = React.useState('')

    React.useEffect(() => {
        if (isBrowser)
            setCurrent(document.querySelector('meta[name="description"]')?.content)
    }, [isBrowser])

    function generateBreadcrumbs() {
        const asPathWithoutQuery = url.split("?")[0]

        const asPathNestedRoutes = asPathWithoutQuery.split("/").filter(v => v.length > 0)
        // eslint-disable-next-line
        const nestedRoutes = asPathNestedRoutes.filter(route => !route.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/))

        const crumblist = nestedRoutes.slice(0, -1).map((subpath, key) => {
            const href = "/" + nestedRoutes.slice(0, key + 1).join("/")

            return { href, text: titleize(subpath) }
        })

        return [{ href: "/", text: denomination }, ...crumblist, { href: "/" + nestedRoutes, text: description ? description : current }]
    }

    const breadcrumbs = generateBreadcrumbs()

    return (
        <Thread aria-label="breadcrumb" className={className ? 'breadcrumb ' + className : 'breadcrumb'}>
            {breadcrumbs.map((crumb, key) => (
                <Crumb {...crumb} key={key} last={key === breadcrumbs.length - 1} />
            ))}
        </Thread>
    )
}

export default Breadcrumbs

/**
 * 
 */

const Thread = styled.div`
    margin-bottom   : 50px;

    a,
    p {
        display        : inline-block;
        font-size      : 13px !important;
        color          : var(--slate-dark) !important;
        font-family    : var(--font-fam2);
        white-space    : nowrap;
        line-height    : 13px;
        vertical-align : middle;

        span {
            vertical-align : middle;
            white-space    : pre-wrap;
        }

        svg {
            width          : 16px;
            height         : 16px;
            margin         : 0 2px;
            display        : inline-block;
            vertical-align : middle;
        }
    }

    a {
        &:hover {
            color : var(--primary) !important;
        }
    }
`