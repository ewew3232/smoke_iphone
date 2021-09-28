;メッセージレイヤの定義

		[position width=920 height=580 top=20 left=20 ]


		
			[position page=fore margint=10 marginl=10 marginr=20 marginb=10 vertical=false opacity="180" color="0x000000" ]
		

		[ptext name="chara_name_area" layer="message0" color=0xFFFFFF size=26 x=30 y=30 bold="bold" edge="" shadow=""]

		;キャラクターの表示モードに関する定義
		[chara_config ptext="chara_name_area" pos_mode=true time="600" memory="false" anim="true" effect="easeInQuad" pos_change_time="600" ]

		;キャラクターフォーカスなど
		[chara_config  talk_focus="none" ]

		;クリック待ちボタンについて
		[glyph fix="false" left="0" top="0" ]

		

            
            [button role="save" graphic="save2.png" x="60" y="540" width="100" height="45" visible="false" ]
            

        

            
            [button role="load" graphic="load2.png" x="200" y="540" width="100" height="45" visible="false" ]
            

        

            
            [button role="sleepgame" graphic="sleep2.png" x="620" y="540" width="100" height="45" visible="false" storage="config.ks"]
            

        

            
            [button role="auto" graphic="auto2.png" x="480" y="540" width="100" height="45" visible="false" ]
            

        

            
            [button role="skip" graphic="skip2.png" x="340" y="540" width="100" height="45" visible="false" ]
            

        

            
            [button role="title" graphic="title2.png" x="760" y="540" width="100" height="45" visible="false" ]
            

        

		;CG・回想用の共通項目
		[eval exp="sf._tb_cg_noimage='toumei_transparent.png'" ]
		[eval exp="sf._tb_replay_noimage='toumei_transparent.png'" ]

		