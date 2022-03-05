import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import Cookies from 'js-cookie';


export const redirectUser = (ctx: any, location: any) => {
    if (ctx.req) {
        ctx.res.writeHead(302, { Location: location });
        ctx.res.end();
        return {};
    } else {
        Router.push(location);
    }

    return
};
