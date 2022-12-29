import React, { useState } from "react";
import Leftbar from "./Leftbar";
import { makeStyles } from "@material-ui/core";
import Topbar from "./topbar";

const UserLayoutStyle = makeStyles(theme =>({
    root: {
        display: 'flex',
    },
    topbarWidth: theme.mixins.toolbar
    
}))

function UserLayout({children}){
const classes  = UserLayoutStyle();
const [isMobile, setIsMobile] = useState(false);
const functionSetMobile = () => {
    setIsMobile(!isMobile);
}
    return(
        <div className={classes.root}> 
          <Leftbar  isMobile={isMobile} functionSetMobile={functionSetMobile}/>
          <Topbar functionSetMobile={functionSetMobile}/>
            <main >
                <div className={classes.topbarWidth} />
                {children}
            </main>
         </div>
    )
   

}
export default UserLayout;