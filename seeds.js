const   mongoose  = require('mongoose'),
        Mask      = require('./models/mask'),
        Comment   = require('./models/comment');

const data = [
    {
        name:"Cat Gold Mask",
        image:"https://file.1001shops.com/Masquerade/Venetian-Masks_Animals_Cat-Gold-Brown-White-Music.jpg",
description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque mauris pellentesque pulvinar pellentesque habitant. Ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim cras. Erat pellentesque adipiscing commodo elit at imperdiet. Purus sit amet volutpat consequat. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Sociis natoque penatibus et magnis dis. Eget dolor morbi non arcu risus quis varius quam quisque. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Vitae turpis massa sed elementum tempus egestas sed sed risus. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Facilisis gravida neque convallis a cras. Morbi non arcu risus quis. Faucibus a pellentesque sit amet. At ultrices mi tempus imperdiet nulla malesuada. Nunc aliquet bibendum enim facilisis. Magna eget est lorem ipsum dolor sit amet Duis at tellus at urna condimentum mattis "    },{
        name:"Imaged Mask",
        image:"https://www.vhv.rs/dpng/d/368-3681820_imagen-mask-tattoo-masquerade-party-venetian-masks-carnival.png",
description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque mauris pellentesque pulvinar pellentesque habitant. Ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim cras. Erat pellentesque adipiscing commodo elit at imperdiet. Purus sit amet volutpat consequat. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Sociis natoque penatibus et magnis dis. Eget dolor morbi non arcu risus quis varius quam quisque. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Vitae turpis massa sed elementum tempus egestas sed sed risus. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Facilisis gravida neque convallis a cras. Morbi non arcu risus quis. Faucibus a pellentesque sit amet. At ultrices mi tempus imperdiet nulla malesuada. Nunc aliquet bibendum enim facilisis. Magna eget est lorem ipsum dolor sit amet Duis at tellus at urna condimentum mattis "    },{
        name:"Venice Mask",
        image:"https://w0.pngwave.com/png/75/892/venice-mask-mask-png-clip-art.png",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Scelerisque mauris pellentesque pulvinar pellentesque habitant. Ornare arcu dui vivamus arcu felis bibendum ut. Est pellentesque elit ullamcorper dignissim cras. Erat pellentesque adipiscing commodo elit at imperdiet. Purus sit amet volutpat consequat. Congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Ultricies mi quis hendrerit dolor magna eget est lorem ipsum. Sociis natoque penatibus et magnis dis. Eget dolor morbi non arcu risus quis varius quam quisque. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Vitae turpis massa sed elementum tempus egestas sed sed risus. Vestibulum lorem sed risus ultricies tristique nulla aliquet. Facilisis gravida neque convallis a cras. Morbi non arcu risus quis. Faucibus a pellentesque sit amet. At ultrices mi tempus imperdiet nulla malesuada. Nunc aliquet bibendum enim facilisis. Magna eget est lorem ipsum dolor sit amet Duis at tellus at urna condimentum mattis  "
    },
]

seedDB = ()=>{
    // remove all masks
    Mask.deleteMany({}, (err) =>{
        if(err) console.log(err);
        // add a few masks
        for(const seed of data){
            Mask.create(seed, (err, mask)=>{
                if(err) console.log(err);
                else{
                    //create a comment
                    Comment.create(
                        {
                            text:"This is a good mask",
                            author:"Hamdy youssef"
                        }, (err, comment) =>{ 
                            if(err) console.log(err);
                            mask.comments.push(comment);
                            mask.save();
                        }
                    )
                }
            })
        }
        // add a few comments
    });

   
}

module.exports = seedDB;