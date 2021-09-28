[_tb_system_call storage=system/_ED2_ENKA.ks]

*start

[cm  ]
[tb_eval  exp="f.password2='mizuki'"  name="password2"  cmd="="  op="t"  val="mizuki"  val_2="undefined"  ]
[tb_show_message_window  ]
[tb_start_text mode=2 ]
エンカの祖母の名字は？　(アルファベット半角小文字)[l][r]
[_tb_end_text]

[edit  left="40"  top="150"  width="150"  height="50"  size="40"  maxchars="6"  reflect="false"  name="f.password2"  ]
[button  storage="ED2_ENKA.ks"  target="*ENKA_ED"  graphic="enter.png"  width="100"  height="50"  x="220"  y="150"  ]
[s  ]
*ENKA_ED

[commit  ]
[jump  storage="ED2_ENKA.ks"  target="*ok"  cond="f.password2=='mizuki'"  ]
[jump  storage="ED2_ENKA.ks"  target="*ng"  cond="f.password2!='mizuki'"  ]
*ok

[cm  ]
[tb_start_text mode=2 ]
TRIPCODES[r][l][r]
◆DearAlice/Mb[l][r]
_#`ﾌﾜ3ﾟﾔﾂｨ硲ﾗﾒ[r][l][r]
◆ForAlice..[l][r]
_#ﾂ牢/ﾕ驛|祝[l][r]
[_tb_end_text]

[cm  ]
[tb_hide_message_window  ]
[breakgame]
[jump  storage="title_screen.ks"  target=""  ]
*ng

[cm  ]
[tb_start_text mode=1 ]

[_tb_end_text]

[cm  ]
[tb_hide_message_window  ]
[breakgame]
[jump  storage="ED.ks"  target="start"  ]
