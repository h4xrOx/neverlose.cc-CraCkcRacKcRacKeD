/**
 * @Author: Neverlose
 * @Date:   2022-02-26 07:21:50
 * @Last Modified by:   
 * @Last Modified time: 2022-02-26 09:34:40
 */

//antiaim
var jitter_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset");
nonode
var yaw_cache = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset")

function lowdeltaslow() {
    localplayer_index = Entity.GetLocalPlayer();

    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "AA on slowwalk") && UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
        UI.SetValue("Anti-Aim", "Fake-Lag", "Jitter", 0);
        UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 16);
        UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 16);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", -10);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 40);
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(0);
        AntiAim.SetRealOffset(-13);
    } else {
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", jitter_cache);
        AntiAim.SetOverride(0);
    }
    if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "AA on slowwalk") && !UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
        UI.SetValue("Anti-Aim", "Fake-Lag", "Jitter", 100);
        UI.SetValue("Anti-Aim", "Fake-Lag", "Trigger limit", 16);
        UI.SetValue("Anti-Aim", "Fake-Lag", "Limit", 0);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", 0);
        UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 5);
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(0);
        AntiAim.SetRealOffset(-29);
    }
}
Cheat.RegisterCallback("CreateMove", "lowdeltaslow");

//local tracer

var x = 0,
    y = 0,
    z = 0;
var eye_angles = [0, 0, 0];
var wts_impact = [0, 0, 0];
var render_time = 0;

function bullet_impact() {
    if (!UI.GetValue("Local Bullet Tracer"))
        return;

    player = Event.GetInt("userid");
    player_id = Entity.GetEntityFromUserID(player);
    impact_x = Event.GetFloat("x"), impact_y = Event.GetFloat("y"), impact_z = Event.GetFloat("z");

    if (Entity.GetLocalPlayer() !== player_id)
        return;

    x = impact_x;
    y = impact_y;
    z = impact_z;

    eye_angles = Entity.GetEyePosition(Entity.GetLocalPlayer());
    render_time = Globals.Curtime();
}

function drawed() {
    if (!UI.GetValue("Local Bullet Tracer"))
        return;

    wts_impact = Render.WorldToScreen([x, y, z]);
    wts_eye_angles = Render.WorldToScreen([eye_angles[0], eye_angles[1], eye_angles[2]]);

    if (wts_impact[2] === 1 && wts_eye_angles[2] === 1 //remove this and experience a mess
        &&
        (Globals.Curtime() - render_time) < 4) //4s just as the client/server impacts
        Render.Line(wts_eye_angles[0], wts_eye_angles[1], wts_impact[0], wts_impact[1], [61, 135, 224, 230]);
}

Cheat.RegisterCallback("bullet_impact", "bullet_impact");
Cheat.RegisterCallback("Draw", "drawed");

//keybinds

const keybinds_x = UI.AddSliderInt("keybinds_x", 0, Global.GetScreenSize()[0])
const keybinds_y = UI.AddSliderInt("keybinds_y", 0, Global.GetScreenSize()[1])
UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x", 0);
UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y", 655);

function in_bounds(vec, x, y, x2, y2) {
    return (vec[0] > x) && (vec[1] > y) && (vec[0] < x2) && (vec[1] < y2)
}

function xy() {
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_x", true)
    UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "keybinds_y", true)
}
xy();

function keybinds() {
    if (UI.GetValue("Script items", "Enable binds list")) {
        var h = [];
        const fontpixel = Render.AddFont("MuseoSansCyrl-500", 12, 100);
        const fontpixel1 = Render.AddFont("MuseoSansCyrl-500", 13, 100);

        var lflt = UI.GetValue("Anti-aim", "Fake-Lag", "Limit");

        if (UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled") && lflt > 0) {
            h.push("Fakelag - " + lflt)
        }
        if (UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Manual dir")) {
            h.push("Manual direction")
        }
        if (UI.GetValue("Misc", "GENERAL", "Movement", "Auto bunnyhop") && Input.IsKeyPressed(0x20)) {
            h.push("Strafe")
        }
        if (UI.IsHotkeyActive("Visual", "WORLD", "View", "Thirdperson")) {
            h.push("Thirdperson")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
            h.push("Slow walk")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck")) {
            h.push("Fake duck")
        }
        if (UI.IsHotkeyActive("Misc", "General", "Movement", "Auto peek")) {
            h.push("Auto peek")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
            h.push("Inverter")
        }
        if (UI.IsHotkeyActive("Rage", "General", "General", "Force safe point")) {
            h.push("Safe point")
        }
        if (UI.IsHotkeyActive("Misc", "JAVASCRIPT", "Script items", "Minimum damage override")) {
            h.push("Dmg override")
        }
        if (UI.IsHotkeyActive("Rage", "General", "General", "Force body aim")) {
            h.push("Body aim")
        }
        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Desync on shot")) {
            h.push("On shot anti-aim")
        }
        if (UI.IsHotkeyActive("Rage", "Exploits", "Hide shots")) {
            h.push("Hide shots")
        }
        if (UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled")) {
            h.push("Triggerbot")
        }
        if (UI.IsHotkeyActive("Rage", "GENERAL", "General", "Resolver override")) {
            h.push("Resolver override")
        }
        if (UI.IsHotkeyActive("Rage", "Exploits", "Double tap")) {
            h.push("Double Tap")
        }

        const x = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x"),
            y = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y");

        const rainbow = [
            Math.floor(Math.sin(Global.Realtime() * 2) * 127 + 128),
            Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
            Math.floor(Math.sin(Global.Realtime() * 2 + 2) * 127 + 128),
            255
        ];


        Render.FilledRect(x, y, 200, 26, [0, 0, 10, 255]);
        Render.FilledRect(x + 1, y - 1, 198, 2, [0, 0, 10, 255]);
        Render.FilledRect(x + 2, y - 2, 196, 2, [0, 0, 10, 255]);
        Render.StringCustom(x + 39, y + 1, 0, "Binds", [255, 255, 255, 255], fontpixel1);

        Render.FilledRect(x + 7, y + 3, 24, 16, [34, 179, 246, 255]);
        Render.FilledRect(x + 8, y + 2, 24, 16, [34, 179, 246, 255]);

        Render.FilledRect(x + 10, y + 5, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 14, y + 5, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 18, y + 5, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 22, y + 5, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 26, y + 5, 3, 3, [0, 0, 10, 255])

        Render.FilledRect(x + 12, y + 9, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 16, y + 9, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 20, y + 9, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 24, y + 9, 3, 3, [0, 0, 10, 255])

        Render.FilledRect(x + 10, y + 13, 3, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 14, y + 13, 11, 3, [0, 0, 10, 255])
        Render.FilledRect(x + 26, y + 13, 3, 3, [0, 0, 10, 255])

        for (i = 0; i < h.length; i++) {
            Render.StringCustom(x + 4, y + 25 + 20 * i, 0, h[i], [255, 255, 255, 255], fontpixel);
            Render.StringCustom(x + 176, y + 25 + 20 * i, 0, "on", [255, 255, 255, 255], fontpixel);
        }

        if (Global.IsKeyPressed(1)) {
            const mouse_pos = Global.GetCursorPosition();
            if (in_bounds(mouse_pos, x - 10, y - 10, x + 220, y + 50)) {
                if (UI.IsMenuOpen() == true)
                    return;
                UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_x", mouse_pos[0] - 100);
                UI.SetValue("Misc", "JAVASCRIPT", "Script items", "keybinds_y", mouse_pos[1] - 5);
            }
        }
    }
}

Global.RegisterCallback("Draw", "keybinds");

//spactator list
UI.AddSliderInt("Specs_x", 0, Render.GetScreenSize()[0])
UI.AddSliderInt("Specs_y", 0, Render.GetScreenSize()[1])
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Specs_x", true)
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Specs_y", true)
UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Specs_x", 250);
UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Specs_y", 655);

function get_spectators() {
    var specs = [];
    const players = Entity.GetPlayers();
    for (i = 0; i < players.length; i++) {
        const cur = players[i];
        if (Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget") != "m_hObserverTarget") {
            const obs = Entity.GetProp(cur, "CBasePlayer", "m_hObserverTarget")

            if (obs === Entity.GetLocalPlayer()) {
                const name = Entity.GetName(cur);
                specs.push(name);
            }
        }
    }
    return specs;
}

function Spectatorss() {
    if (UI.GetValue("Script items", "Enable spectators list")) {
        const fontpixel = Render.AddFont("MuseoSansCyrl-500", 12, 100);
        const fontpixel1 = Render.AddFont("MuseoSansCyrl-500", 13, 100);
        var icons = Render.AddFont("raphaelicons", 19, 500)
        const names = get_spectators();
        const x1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Specs_x"),
            y1 = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Specs_y");

        //Light bottom
        Render.FilledRect(x1, y1, 200, 26, [0, 0, 10, 255]);
        Render.FilledRect(x1 + 1, y1 - 1, 198, 2, [0, 0, 10, 255]);
        Render.FilledRect(x1 + 2, y1 - 2, 196, 2, [0, 0, 10, 255]);
        //Dark Top rectangle
        Render.FilledRect(x1, y1, 200, 26, [0, 0, 10, 255]);
        Render.FilledRect(x1 + 1, y1 - 1, 198, 2, [0, 0, 10, 255]);
        Render.FilledRect(x1 + 2, y1 - 2, 196, 2, [0, 0, 10, 255]);
        //Logo
        Render.StringCustom(x1 + 5, y1, 0, "K", [34, 179, 246, 255], icons);
        //Spectators text
        Render.StringCustom(x1 + 30, y1 + 1, 0, "Spectators", [255, 255, 255, 255], fontpixel1);

        //Logo ENd

        //Render Active Keybind
        for (i = 0; i < names.length; i++) {
            Render.StringCustom(x1 + 5, y1 + 25 + 25 * i, 0, names[i], [255, 255, 255, 255], fontpixel);
        }

        //Move menu
        if (Global.IsKeyPressed(1)) {
            const mouse_pos = Global.GetCursorPosition();
            if (in_bounds(mouse_pos, x1, y1, x1 + 200, y1 + 26)) {
                if (UI.IsMenuOpen() == true)
                    return;
                UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Specs_x", mouse_pos[0] - 100);
                UI.SetValue("Misc", "JAVASCRIPT", "Script items", "Specs_y", mouse_pos[1] - 15);
            }
        }
    }

}



Global.RegisterCallback("Draw", "Spectatorss");

//resolver
/*
UI.AddCheckbox("Better resolver")
var onres = UI.GetValue("Script items", "Better resolver")
var isKeyActive = UI.IsHotkeyActive( "Rage", "GENERAL", "General", "Resolver override" );
function betterresik()
{
    if (onres = true)
    {
        if (offover = true)
        {
            UI.ToggleHotkey("Rage", "GENERAL", "General", "Resolver override")
        }
        else if (offover = true)
        {
            UI.ToggleHotkey("Rage", "GENERAL", "General", "Resolver override")
        }
    }
    else
    {

    }
}
Cheat.RegisterCallback("CreateMove", "betterresik");
*/

///clantag
var lasttime = 0;

function clantag() {
    var tag = UI.GetValue("Script items", "Clantag");
    var time = parseInt((Globals.Curtime() * 5))
    if (time != lasttime) {
        if (tag == true) {
            Local.SetClanTag("");
        }
        if (tag == true) {
            switch ((time) % 53) {
                case 1:
                    {
                        Local.SetClanTag("  ");
                        break;
                    }
                case 2:
                    {
                        Local.SetClanTag(" | ");
                        break;
                    }
                case 3:
                    {
                        Local.SetClanTag(" |\\ ");
                        break;
                    }
                case 4:
                    {
                        Local.SetClanTag(" |\\| ");
                        break;
                    }
                case 5:
                    {
                        Local.SetClanTag(" N ");
                        break;
                    }
                case 6:
                    {
                        Local.SetClanTag(" N3 ");
                        break;
                    }
                case 7:
                    {
                        Local.SetClanTag(" Ne ");
                        break;
                    }
                case 8:
                    {
                        Local.SetClanTag(" Ne\\ ");
                        break;
                    }
                case 9:
                    {
                        Local.SetClanTag(" Ne\\/ ");
                        break;
                    }
                case 10:
                    {
                        Local.SetClanTag(" Nev ");
                        break;
                    }
                case 11:
                    {
                        Local.SetClanTag(" Nev3 ");
                        break;
                    }
                case 12:
                    {
                        Local.SetClanTag(" Neve ");
                        break;
                    }
                case 13:
                    {
                        Local.SetClanTag(" Neve| ");
                        break;
                    }
                case 14:
                    {
                        Local.SetClanTag(" Neve|2 ");
                        break;
                    }
                case 15:
                    {
                        Local.SetClanTag(" Never|_ ");
                        break;
                    }
                case 16:
                    {
                        Local.SetClanTag(" Neverl ");
                        break;
                    }
                case 17:
                    {
                        Local.SetClanTag(" Neverl0 ");
                        break;
                    }
                case 18:
                    {
                        Local.SetClanTag(" Neverlo ");
                        break;
                    }
                case 19:
                    {
                        Local.SetClanTag(" Neverlo5 ");
                        break;
                    }
                case 20:
                    {
                        Local.SetClanTag(" Neverlos ");
                        break;
                    }
                case 21:
                    {
                        Local.SetClanTag(" Neverlos3 ");
                        break;
                    }
                case 22:
                    {
                        Local.SetClanTag(" Neverlose ");
                        break;
                    }
                case 23:
                    {
                        Local.SetClanTag(" Neverlose. ");
                        break;
                    }
                case 24:
                    {
                        Local.SetClanTag(" Neverlose.< ");
                        break;
                    }
                case 25:
                    {
                        Local.SetClanTag(" Neverlose.c< ");
                        break;
                    }
                case 26:
                    {
                        Local.SetClanTag(" Neverlose.cc ");
                        break;
                    }
                case 27:
                    {
                        Local.SetClanTag(" Neverlose.cc ");
                        break;
                    }
                case 28:
                    {
                        Local.SetClanTag(" Neverlose.c< ");
                        break;
                    }
                case 29:
                    {
                        Local.SetClanTag(" Neverlose.< ");
                        break;
                    }
                case 30:
                    {
                        Local.SetClanTag(" Neverlose. ");
                        break;
                    }
                case 31:
                    {
                        Local.SetClanTag(" Neverlose ");
                        break;
                    }
                case 32:
                    {
                        Local.SetClanTag(" Neverlos3 ");
                        break;
                    }
                case 33:
                    {
                        Local.SetClanTag(" Neverlos ");
                        break;
                    }
                case 34:
                    {
                        Local.SetClanTag(" Neverlo5 ");
                        break;
                    }
                case 35:
                    {
                        Local.SetClanTag(" Neverlo ");
                        break;
                    }
                case 36:
                    {
                        Local.SetClanTag(" Neverl0 ");
                        break;
                    }
                case 37:
                    {
                        Local.SetClanTag(" Neverl ");
                        break;
                    }
                case 38:
                    {
                        Local.SetClanTag(" Never|_ ");
                        break;
                    }
                case 39:
                    {
                        Local.SetClanTag(" Never|2 ");
                        break;
                    }
                case 40:
                    {
                        Local.SetClanTag(" Neve|2 ");
                        break;
                    }
                case 41:
                    {
                        Local.SetClanTag(" Neve| ");
                        break;
                    }
                case 42:
                    {
                        Local.SetClanTag(" Neve ");
                        break;
                    }
                case 43:
                    {
                        Local.SetClanTag(" Nev3 ");
                        break;
                    }
                case 44:
                    {
                        Local.SetClanTag(" Nev ");
                        break;
                    }
                case 45:
                    {
                        Local.SetClanTag(" Ne\\/ ");
                        break;
                    }
                case 46:
                    {
                        Local.SetClanTag(" Ne\\ ");
                        break;
                    }
                case 47:
                    {
                        Local.SetClanTag(" Ne ");
                        break;
                    }
                case 48:
                    {
                        Local.SetClanTag(" N3 ");
                        break;
                    }
                case 49:
                    {
                        Local.SetClanTag(" N ");
                        break;
                    }
                case 50:
                    {
                        Local.SetClanTag(" |\\| ");
                        break;
                    }
                case 51:
                    {
                        Local.SetClanTag(" |\\ ");
                        break;
                    }
                case 52:
                    {
                        Local.SetClanTag(" | ");
                        break;
                    }
                case 53:
                    {
                        Local.SetClanTag("  ");
                        break;
                    }


            }
        }
    }
    lasttime = time;
}
Cheat.RegisterCallback("Draw", "clantag");

//set settings
function setSsaa() {
    var aaon = UI.GetValue("Script items", "Enable antiaim")
    var aaat = UI.GetValue("Script items", "At targets")
    var aaad = UI.GetValue("Script items", "Freestand")

    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Enabled", aaon)
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "At targets", aaat)
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Auto direction", aaad)
}
Cheat.RegisterCallback("Draw", "setSsaa");
//watermark

Cheat.CursorInBox = function(x, y, length, height) {
    var cursor = Input.GetCursorPosition()
    if (cursor[0] > x && cursor[0] < x + length && cursor[1] > y && cursor[1] < y + height)
        return true
    return true
}

function settings(x, y, w, h, color, title) {
    var font = Render.AddFont("MuseoSansCyrl-500", 12, 500)
    var font3 = Render.AddFont("MuseoSansCyrl-900", 12, 500)
    var font2 = Render.AddFont("MuseoSansCyrl-900", 21, 500)

    Render.FilledRect(x, y - 1, w - 2, h, color)
    Render.FilledRect(x - 1, y, w, h - 2, color)

    Render.FilledRect(x - 1, y + 25, 300, 2, [16, 37, 61, 255], font)
    Render.FilledRect(x - 1, y + 95, 300, 2, [16, 37, 61, 255], font)
    Render.FilledRect(x - 1, y + 375, 300, 2, [16, 37, 61, 255], font)

    //version
    Render.StringCustom(x + 20, y + 125, 0, "Version:", [255, 255, 255, 255], font3)
    Render.StringCustom(x + 90, y + 125, 0, "1.0.0", [34, 179, 246, 255], font3)

    //build date
    Render.StringCustom(x + 20, y + 155, 0, "Build date:", [255, 255, 255, 255], font3)
    Render.StringCustom(x + 110, y + 155, 0, "09.01.2021", [34, 179, 246, 255], font3)

    //build type
    Render.StringCustom(x + 20, y + 185, 0, "Build type:", [255, 255, 255, 255], font3)
    Render.StringCustom(x + 110, y + 185, 0, "Beta", [34, 179, 246, 255], font3)

    //build type
    Render.StringCustom(x + 20, y + 215, 0, "Created by:", [255, 255, 255, 255], font3)
    Render.StringCustom(x + 115, y + 215, 0, "Magma (magma#8327)", [34, 179, 246, 255], font3)

    //subribtion
    Render.StringCustom(x + 20, y + 245, 0, "Subcription till:", [255, 255, 255, 255], font3)
    Render.StringCustom(x + 145, y + 245, 0, "Never", [34, 179, 246, 255], font3)

    //neverlose copy
    Render.StringCustom(x + 76, y + 315, 0, "neverlose.cc © 2021", [255, 255, 255, 255], font)

    Render.StringCustom(x + 36, y + 3, 0, title, [255, 255, 255, 255], font)
    Render.StringCustom(x + 6, y + 3, 0, "NL", [34, 179, 246, 255], font3)
    Render.StringCustom(x + 7, y + 3, 0, "NL", [209, 217, 243, 255], font3)

    Render.StringCustom(x + 39, y + 44, 0, "NEVERLOSE.CC", [34, 179, 246, 255], font2)
    Render.StringCustom(x + 40, y + 45, 0, "NEVERLOSE.CC", [255, 255, 255, 255], font2)
}

function drawBoard(x, y, w, h, color, title) {
    var font = Render.AddFont("MuseoSansCyrl-900", 21, 500)
    var font2 = Render.AddFont("MuseoSansCyrl-500", 11, 500)
    var font3 = Render.AddFont("MuseoSansCyrl-900", 11, 500)
    var icon = Render.AddFont("raphaelicons", 19, 500)

    Render.FilledRect(x, y - 1, 198, 630, [4, 12, 25, 230])
    Render.FilledRect(x + 198, y - 1, 650, 630, [9, 6, 13, 255])

    Render.FilledCircle(x + 30, y + 595, 20, [255, 255, 255, 255])

    Render.FilledRect(x, y + 560, 198, 2, [16, 37, 61, 200])
    Render.FilledRect(x + 198, y + 55, 650, 2, [16, 37, 61, 200])

    Render.StringCustom(x + 20, y + 54, 0, "Aimbot", [48, 58, 70, 255], font3)
    Render.StringCustom(x + 20, y + 174, 0, "Visual", [48, 58, 70, 255], font3)
    Render.StringCustom(x + 20, y + 353, 0, "Miscellaneous", [48, 58, 70, 255], font3)

    //icons
    Render.StringCustom(x + 11, y + 81, 0, "%", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 111, 0, "0", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 141, 0, ")", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 201, 0, "L", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 231, 0, "a", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 261, 0, "u", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 291, 0, "7", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 321, 0, "i", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 381, 0, "/", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 411, 0, "c", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 441, 0, ";", [34, 179, 246, 255], icon)
    Render.StringCustom(x + 11, y + 471, 0, "E", [34, 179, 246, 255], icon)

    //settings logo


    Render.StringCustom(x + 20, y + 14, 0, title, [34, 179, 246, 255], font)
    Render.StringCustom(x + 21, y + 15, 0, title, [255, 255, 255, 255], font)
    Render.StringCustom(x + 65, y + 577, 0, "Magma", [255, 255, 255, 255], font2) //name
    Render.StringCustom(x + 65, y + 598, 0, "Till: ", [45, 45, 45, 255], font2) //podpiska
    Render.StringCustom(x + 95, y + 598, 0, "never", [51, 136, 255, 255], font2) //time podpiska
}



X = function() {
    return UI.GetValue("Script items", "X")
}
Y = function() {
    return UI.GetValue("Script items", "Y")
}

function sliders() {
    UI.AddSliderInt("X", -630, Render.GetScreenSize()[0])
    UI.AddSliderInt("Y", -600, Render.GetScreenSize()[1])

    UI.SetEnabled("Script items", "X", true)
    UI.SetEnabled("Script items", "Y", true)
}
sliders()

var menumove = true;
var waitforup = true;
var offsetx = 0;
var offsety = 0;

function checkMovement() {
    var cursor = Input.GetCursorPosition()
    var onmenu = Cheat.CursorInBox(X(), Y(), 850, 630)
    if (UI.IsMenuOpen()) {
        if (Input.IsKeyPressed(0x01) && !waitforup && onmenu) {
            menumove = true
            offsetx = cursor[0] - X()
            offsety = cursor[1] - Y()
            waitforup = true
        }
        if (!Input.IsKeyPressed(0x01)) {
            menumove = true
            waitforup = true
        }
        if (menumove) {
            UI.SetValue("Script items", "X", cursor[0] - offsetx)
            UI.SetValue("Script items", "Y", cursor[1] - offsety)
        }
    }
}
Cheat.RegisterCallback("Draw", "checkMovement")


var idCheckbox = 0
var comboOverlapping = true
var comboactive = -1
var wasDown = []

function resetSpacing() {
    idCheckbox = 0
}
resetSpacing()

function checkbox(x, y, name, enable) {
    var font = Render.AddFont("MuseoSansCyrl-500", 12, 500)
    var color = [11, 17, 43, 255]
    var color1 = [74, 87, 97, 255]
    var xs = 0

    if (enable) {
        color = [3, 23, 46, 255]
        color1 = [3, 168, 245, 255]
        color2 = [255, 255, 255, 255]
        xs = 28
    } else {
        color = [11, 17, 43, 255]
        color1 = [74, 87, 97, 255]
        color2 = [210, 210, 210, 255]
        xs = 0
    }

    if (!comboOverlapping) {
        Render.FilledCircle(x + 236, y + 15, 7, color)
        Render.FilledCircle(x + 263, y + 15, 7, color)
        Render.FilledRect(x + 235, y + 8, 30, 15, color)

        Render.FilledCircle(x + 236 + xs, y + 15, 9, color1)

        Render.StringCustom(x, y + 5, 0, name, color2, font)
    }

    if (UI.IsMenuOpen() && !comboOverlapping) {
        if ((Cheat.CursorInBox(x + 232, y + 8, 42, 15)) && comboactive == -1) {
            if (!wasDown[idCheckbox]) {
                if (Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            } else if (wasDown[idCheckbox]) {
                if (!Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            }
            return true
        }
    }
}

function settings_checkbox(x, y, name, enable) {
    var color1 = [74, 87, 97, 255]

    if (enable) {
        color = [3, 23, 46, 255]
        color1 = [3, 168, 245, 255]

    } else {
        color = [11, 17, 43, 255]
        color1 = [74, 87, 97, 255]

    }

    if (!comboOverlapping) {
        Render.FilledCircle(x + 186, y + 15, 12, color1)
    }

    if (UI.IsMenuOpen() && !comboOverlapping) {
        if ((Cheat.CursorInBox(x + 173, y + 3, 24, 24)) && comboactive == -1) {
            if (!wasDown[idCheckbox]) {
                if (Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            } else if (wasDown[idCheckbox]) {
                if (!Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            }
            return true
        }
    }
}


function addTab(x, y, name, value) {
    var font = Render.AddFont("MuseoSansCyrl-500", 13, 500)
    var color1 = [74, 87, 97, 255]
    var enable = UI.GetValue("Script items", "Tabs")
    if (value == enable) {
        color1 = [255, 255, 255, 255]
        color2 = [5, 50, 75, 255]
    } else {
        color1 = [255, 255, 255, 255]
        color2 = [255, 255, 255, 0]
    }

    if (!comboOverlapping) {

        Render.FilledRect(x + 2, y, 180, 25, color2)
        Render.FilledRect(x, y - 2, 180, 25, color2)
        Render.FilledRect(x - 2, y, 180, 25, color2)
        Render.FilledRect(x, y + 2, 180, 25, color2)
        Render.StringCustom(x + 30, y + 2, 0, name, color1, font)
    }

    if (UI.IsMenuOpen() && !comboOverlapping) {
        if ((Cheat.CursorInBox(x, y, 180, 25)) && comboactive == -1) {
            if (!wasDown[idCheckbox]) {
                if (Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            } else if (wasDown[idCheckbox]) {
                if (!Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            }
            return true
        }
    }
}

function weaponGroup(x, y, name, value) {
    var font = Render.AddFont("MuseoSansCyrl-500", 13, 500)
    var color1 = [74, 87, 97, 255]
    var enableRAGE = UI.GetValue("Script items", "WeaponsRage")
    if (value == enableRAGE) {
        color1 = [255, 255, 255, 255]
        color2 = [5, 50, 75, 255]
    } else {
        color1 = [255, 255, 255, 255]
        color2 = [255, 255, 255, 0]
    }

    if (!comboOverlapping) {

        Render.FilledRect(x + 2, y, 75, 25, color2)
        Render.FilledRect(x, y - 2, 75, 25, color2)
        Render.FilledRect(x - 2, y, 75, 25, color2)
        Render.FilledRect(x, y + 2, 75, 25, color2)
        Render.StringCustom(x, y + 2, 0, name, color1, font)
    }

    if (UI.IsMenuOpen() && !comboOverlapping) {
        if ((Cheat.CursorInBox(x, y, 75, 25)) && comboactive == -1) {
            if (!wasDown[idCheckbox]) {
                if (Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            } else if (wasDown[idCheckbox]) {
                if (!Input.IsKeyPressed(0x01)) {
                    wasDown[idCheckbox] = true
                    return true
                }
            }
            return true
        }
    }
}


/*
x - отступ с лева
y - отступ с верху
h - ширина
w - высота
*/
function menubox(x, y, h, w, name) {
    var font = Render.AddFont("MuseoSansCyrl-500", 13, 500)
    var color1 = [255, 255, 255, 255]
    var color2 = [1, 11, 21, 255]
    var color3 = [7, 25, 37, 255]

    if (!comboOverlapping) {

        Render.FilledRect(x, y, h, w, color2)
        Render.FilledRect(x + 2, y + 30, h - 4, 2, color3)
        Render.StringCustom(x + 10, y + 5, 0, name, color1, font)
    }
}


//mainmenu

//chacks misc-aa
UI.AddCheckbox("Enable binds list")
UI.AddCheckbox("Enable spectators list")
UI.AddCheckbox("Clantag")
UI.AddCheckbox("Rage")
UI.AddCheckbox("Enable antiaim")
UI.AddCheckbox("At targets")
UI.AddCheckbox("Freestand")
UI.AddCheckbox("AA on slowwalk")
    //trued misc- aa
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Enable binds list", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Enable spectators list", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Clantag", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Rage", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Enable antiaim", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "At targets", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Freestand", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "AA on slowwalk", true);

//visuals

UI.AddCheckbox("Local Bullet Tracer");
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Local Bullet Tracer", true);

//tabs
UI.AddDropdown("Tabs", ["Ragebot", "Antiaim", "Legitbot", "Players", "Weapon", "Grenades", "World", "View", "Main", "Inventory", "Scripts", "Config"])
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Tabs", true);

//weapon group
//-rage
UI.AddDropdown("WeaponsRage", ["GENERAL", "PISTOL", "HEAVY PISTOL", "SCOUT", "AWP", "AUTOSNIPER"])
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "WeaponsRage", true);


// rage
UI.AddCheckbox("Enable rage")
UI.AddCheckbox("Override default for pistol")
UI.AddCheckbox("Override default for heavy")
UI.AddCheckbox("Override default for scout")
UI.AddCheckbox("Override default for awp")
UI.AddCheckbox("Override default for auto")
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Enable rage", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Override default for pistol", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Override default for heavy", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Override default for scout", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Override default for awp", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Override default for auto", true);

UI.AddCheckbox("Settings")
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Settings", true);
UI.AddCheckbox("Show ping")
UI.AddCheckbox("Show name")
UI.AddCheckbox("Show time")
UI.AddCheckbox("Show ip")
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Show ping", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Show name", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Show time", true);
UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", "Show ip", true);

/*
UI.SetEnabled( "Legit", "GENERAL", "General", "Enabled", true );
UI.SetEnabled( "Legit", "GENERAL", "General", "Reaction time", true );
UI.SetEnabled( "Legit", "GENERAL", "Triggerbot", "Enabled", true );
UI.SetEnabled( "Legit", "GENERAL", "Triggerbot", "Magnet", true );
UI.SetEnabled( "Legit", "GENERAL", "Backtracking", "Enabled", true );
UI.SetEnabled( "Legit", "GENERAL", "Backtracking", "Maximum time", true );

UI.SetEnabled( "Legit", "GENERAL", "Default config", "Hitboxes", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Hitbox priority", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Fov", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Deadzone", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Speed (yaw)", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Speed (pitch)", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Recoil control", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Assist", true );
UI.SetEnabled( "Legit", "GENERAL", "Default config", "Triggerbot hitchance", true );

UI.SetEnabled( "Legit", "PISTOL", "General", "Override default", true );
UI.SetEnabled( "Legit", "RIFLE", "General", "Override default", true );
UI.SetEnabled( "Legit", "SNIPER", "General", "Override default", true );
UI.SetEnabled( "Legit", "SMG", "General", "Override default", true );
*/


UI.SetEnabled("Misc", "PERFOMANCE & INFORMATION", "Information", "Watermark", true);

UI.SetValue("Misc", "PERFOMANCE & INFORMATION", "Information", "Watermark", true);

function mainmenu() {

    var AddCheckbox = function(x, y, name) {
        if (checkbox(x, y, name, UI.GetValue("Script items", name))) UI.SetValue("Script items", name, !UI.GetValue("Script items", name))
    }
    var AddTab = function(x, y, name, value) {
        if (addTab(x, y, name, value)) UI.SetValue("Script items", "Tabs", value)
    }
    var AddGroup = function(x, y, name, value) {
        if (weaponGroup(x, y, name, value)) UI.SetValue("Script items", "WeaponsRage", value)
    }
    var AddBox = function(x, y, h, w, name) {
        if (menubox(x, y, h, w, name));
    }


    if (UI.IsMenuOpen()) {

        drawBoard(X(), Y(), 200, 630, [7, 9, 23, 255], "NEVERLOSE");

        AddTab(X() + 10, Y() + 80, "Ragebot", 0)
        AddTab(X() + 10, Y() + 110, "Antiaim", 1)
        AddTab(X() + 10, Y() + 140, "Legitbot", 2)
        AddTab(X() + 10, Y() + 200, "Players", 3)
        AddTab(X() + 10, Y() + 230, "Weapon", 4)
        AddTab(X() + 10, Y() + 260, "Grenades", 5)
        AddTab(X() + 10, Y() + 290, "World", 6)
        AddTab(X() + 10, Y() + 320, "View", 7)
        AddTab(X() + 10, Y() + 380, "Main", 8)
        AddTab(X() + 10, Y() + 410, "Inventory", 9)
        AddTab(X() + 10, Y() + 440, "Script", 10)
        AddTab(X() + 10, Y() + 470, "Config", 11)
        if (UI.GetValue("Script items", "Tabs") == 0) {
            AddGroup(X() + 210, Y() + 15, "GENERAL", 0)
            AddGroup(X() + 290, Y() + 15, " PISTOLS", 1)
            AddGroup(X() + 370, Y() + 15, "  HEAVY", 2)
            AddGroup(X() + 450, Y() + 15, "  SCOUT", 3)
            AddGroup(X() + 530, Y() + 15, "    AWP", 4)
            AddGroup(X() + 610, Y() + 15, "   AUTO", 5)
            if (UI.GetValue("Script items", "WeaponsRage") == 0) {
                AddBox(X() + 215, Y() + 65, 295, 280, "Main")
                AddCheckbox(X() + 225, Y() + 105, "Enable rage")

            }
            if (UI.GetValue("Script items", "WeaponsRage") == 1) {
                AddBox(X() + 215, Y() + 65, 295, 280, "Main")
                AddCheckbox(X() + 225, Y() + 105, "Override default for pistol")
            }
            if (UI.GetValue("Script items", "WeaponsRage") == 2) {
                AddBox(X() + 215, Y() + 65, 295, 280, "Main")
                AddCheckbox(X() + 225, Y() + 105, "Override default for heavy")
            }
            if (UI.GetValue("Script items", "WeaponsRage") == 3) {
                AddBox(X() + 215, Y() + 65, 295, 280, "Main")
                AddCheckbox(X() + 225, Y() + 105, "Override default for scout")
            }
            if (UI.GetValue("Script items", "WeaponsRage") == 4) {
                AddBox(X() + 215, Y() + 65, 295, 280, "Main")
                AddCheckbox(X() + 225, Y() + 105, "Override default for awp")
            }
            if (UI.GetValue("Script items", "WeaponsRage") == 5) {
                AddBox(X() + 215, Y() + 65, 295, 280, "Main")
                AddCheckbox(X() + 225, Y() + 105, "Override default for auto")
            }
        }
        if (UI.GetValue("Script items", "Tabs") == 1) {
            AddBox(X() + 215, Y() + 65, 295, 280, "Main")
            AddBox(X() + 530, Y() + 65, 295, 240, "Fake Angle")
            AddBox(X() + 215, Y() + 355, 295, 260, "Fake Lag")
            AddBox(X() + 530, Y() + 315, 295, 280, "Misc")
            AddCheckbox(X() + 225, Y() + 105, "Enable antiaim")
            AddCheckbox(X() + 225, Y() + 135, "At targets")
            AddCheckbox(X() + 225, Y() + 165, "Freestand")
            AddCheckbox(X() + 225, Y() + 195, "AA on slowwalk")
        }
        if (UI.GetValue("Script items", "Tabs") == 2) {

        }
        if (UI.GetValue("Script items", "Tabs") == 3) {

        }
        if (UI.GetValue("Script items", "Tabs") == 4) {

        }
        if (UI.GetValue("Script items", "Tabs") == 5) {

        }
        if (UI.GetValue("Script items", "Tabs") == 6) {

        }
        if (UI.GetValue("Script items", "Tabs") == 7) {
            AddBox(X() + 215, Y() + 65, 295, 280, "Main")
            AddCheckbox(X() + 225, Y() + 105, "Local Bullet Tracer")
        }
        if (UI.GetValue("Script items", "Tabs") == 8) {
            AddCheckbox(X() + 215, Y() + 65, "Clantag")
            AddCheckbox(X() + 215, Y() + 95, "Enable binds list")
            AddCheckbox(X() + 215, Y() + 125, "Enable spectators list")
        }
        if (UI.GetValue("Script items", "Tabs") == 9) {

        }
        if (UI.GetValue("Script items", "Tabs") == 10) {

        }
        if (UI.GetValue("Script items", "Tabs") == 11) {

        }
    }
}

Cheat.RegisterCallback("Draw", "mainmenu")

function settings_menu() {

    var AddCheckbox = function(x, y, name) {
        if (checkbox(x, y, name, UI.GetValue("Script items", name))) UI.SetValue("Script items", name, !UI.GetValue("Script items", name))
    }
    var Addsettings_checkbox = function(x, y, name) {
        if (settings_checkbox(x, y, name, UI.GetValue("Script items", name))) UI.SetValue("Script items", name, !UI.GetValue("Script items", name))
    }

    var username = Cheat.GetUsername()
    var today = new Date();
    var ping = Math.floor(Global.Latency() * 1000 / 1.5);
    var ip = World.GetServerString()
    var hours1 = today.getHours();
    var minutes1 = today.getMinutes();
    var seconds1 = today.getSeconds();
    var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
    var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
    var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds();

    var font = Render.AddFont("MuseoSansCyrl-900", 9, 900)
    var font1 = Render.AddFont("MuseoSansCyrl-900", 11, 900)

    var text = ""

    if (UI.GetValue("Script items", "Show name")) {
        text += ("| " + username)
    }
    if (UI.GetValue("Script items", "Show ping")) {
        text += (" | " + ping + " mc")
    }
    if (UI.GetValue("Script items", "Show time")) {
        text += (" | " + hours + minutes + seconds)
    }
    if (UI.GetValue("Script items", "Show ip")) {
        text += (" | " + ip)
    }

    var text1 = "NL"

    var h = 27;
    var w = Render.TextSizeCustom(text, font)[0] + 33;
    var x = Global.GetScreenSize()[0] - 2;
    var y = 12;
    x = x - w - 10;

    Render.FilledRect(x, y - 1, w - 2, h, [0, 20, 20, 255]);
    Render.FilledRect(x - 1, y, w, h - 2, [0, 20, 20, 255]);
    Render.StringCustom(x + 28, y + 5, 0, text, [255, 255, 255, 255], font)

    Render.StringCustom(x + 4, y + 3, 0, text1, [34, 179, 246, 255], font1)
    Render.StringCustom(x + 5, y + 4, 0, text1, [255, 255, 255, 255], font1)

    if (UI.IsMenuOpen()) {
        Addsettings_checkbox(X() + 605, Y() + 10, "Settings")
        if (UI.GetValue("Script Items", "Settings")) {
            settings(X() + 870, Y() + 50, 300, 530, [9, 6, 13, 225], "About Neverlose");

            AddCheckbox(X() + 885, Y() + 440, "Show ping")
            AddCheckbox(X() + 885, Y() + 470, "Show name")
            AddCheckbox(X() + 885, Y() + 500, "Show time")
            AddCheckbox(X() + 885, Y() + 530, "Show ip")
        }
    }
}

Cheat.RegisterCallback("Draw", "settings_menu") var minutes1 = today.getMinutes();
var seconds1 = today.getSeconds();
var hours = hours1 <= 9 ? "0" + today.getHours() + ":" : today.getHours() + ":";
var minutes = minutes1 <= 9 ? "0" + today.getMinutes() + ":" : today.getMinutes() + ":";
var seconds = seconds1 <= 9 ? "0" + today.getSeconds() : today.getSeconds();

var font = Render.AddFont("MuseoSansCyrl-900", 9, 900)
var font1 = Render.AddFont("MuseoSansCyrl-900", 11, 900)

var text = ""

if (UI.GetValue("Script items", "Show name")) {
    text += ("| " + username)
}
if (UI.GetValue("Script items", "Show ping")) {
    text += (" | " + ping + " mc")
}
if (UI.GetValue("Script items", "Show time")) {
    text += (" | " + hours + minutes + seconds)
}
if (UI.GetValue("Script items", "Show ip")) {
    text += (" | " + ip)
}

var text1 = "NL"

var h = 27;
var w = Render.TextSizeCustom(text, font)[0] + 33;
var x = Global.GetScreenSize()[0] - 2;
var y = 12;
x = x - w - 10;

Render.FilledRect(x, y - 1, w - 2, h, [0, 20, 20, 255]);
Render.FilledRect(x - 1, y, w, h - 2, [0, 20, 20, 255]);
Render.StringCustom(x + 28, y + 5, 0, text, [255, 255, 255, 255], font)

Render.StringCustom(x + 4, y + 3, 0, text1, [34, 179, 246, 255], font1)
Render.StringCustom(x + 5, y + 4, 0, text1, [255, 255, 255, 255], font1)

if (UI.IsMenuOpen()) {
    Addsettings_checkbox(X() + 605, Y() + 10, "Settings")
    if (UI.GetValue("Script Items", "Settings")) {
        settings(X() + 870, Y() + 50, 300, 530, [9, 6, 13, 225], "About Neverlose");

        AddCheckbox(X() + 885, Y() + 440, "Show ping")
        AddCheckbox(X() + 885, Y() + 470, "Show name")
        AddCheckbox(X() + 885, Y() + 500, "            AddCheckbox(X() + 885, Y() + 530, "
            Show ip ")
        }
    }
}

Cheat.RegisterCallback("Draw", "settings_menu")
